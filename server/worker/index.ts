/**
 * Bekzod & Parvina Wedding - Telegram Moderation Cloudflare Worker
 * 
 * Routes:
 * 1. POST /api/notify-wish - Called by website when a guest submits a wish; sends alert with inline buttons to Telegram.
 * 2. POST /api/telegram-webhook - Webhook from Telegram; handles [Approve] / [Reject] button clicks and updates Firestore.
 * 3. GET / - Health check.
 */

export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  TELEGRAM_TOPIC_ID?: string;
  FIREBASE_PROJECT_ID: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Health check
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          wedding: 'Bekzod & Parvina — 10.01.2027',
          description: 'Telegram Bot Moderation Worker for Guestbook',
        }),
        { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    // Route 1: POST /api/notify-wish
    if (request.method === 'POST' && url.pathname.endsWith('/notify-wish')) {
      try {
        const body = (await request.json()) as {
          wishId: string;
          name: string;
          initials?: string;
          relationshipKey?: string;
          message: string;
          virtualGift?: string;
        };

        if (!body.wishId || !body.name || !body.message) {
          return new Response(
            JSON.stringify({ error: 'Missing required wish fields' }),
            { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
          );
        }

        const relationMap: Record<string, string> = {
          groom: "Kuyov tomoni",
          bride: "Kelin tomoni",
          friends: "Qadrdon do'stlar",
          relatives: "Qarindoshlar",
          colleagues: "Hamkasblar",
        };

        const relationLabel = relationMap[body.relationshipKey || ''] || body.relationshipKey || "Mehmon";
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString('uz-UZ')}, ${now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}`;

        const telegramText =
          `💌 <b>YANGI TO'Y TILAGI!</b>\n` +
          `💍 <i>Bekzod & Parvina Nikoh To'yi</i>\n\n` +
          `👤 <b>Mehmon:</b> ${escapeHtml(body.name)} (${escapeHtml(relationLabel)})\n` +
          `🎁 <b>Hadya:</b> ${body.virtualGift || '💍'}\n` +
          `⏰ <b>Vaqti:</b> ${formattedDate}\n\n` +
          `📝 <b>Tilak:</b>\n"<i>${escapeHtml(body.message)}</i>"`;

        const inlineKeyboard = {
          inline_keyboard: [
            [
              {
                text: '✅ Tasdiqlash (Devorga chiqarish)',
                callback_data: `approve:${body.wishId}`,
              },
              {
                text: '❌ Rad etish',
                callback_data: `reject:${body.wishId}`,
              },
            ],
          ],
        };

        const messagePayload: any = {
          chat_id: env.TELEGRAM_CHAT_ID,
          text: telegramText,
          parse_mode: 'HTML',
          reply_markup: inlineKeyboard,
        };

        if (env.TELEGRAM_TOPIC_ID) {
          messagePayload.message_thread_id = parseInt(env.TELEGRAM_TOPIC_ID, 10);
        }

        // Send to Telegram
        let tgRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload),
          }
        );

        let tgData = (await tgRes.json()) as any;

        // Auto-heal if chat was upgraded to a supergroup
        if (tgData?.parameters?.migrate_to_chat_id) {
          const newChatId = String(tgData.parameters.migrate_to_chat_id);
          messagePayload.chat_id = newChatId;
          const retryRes = await fetch(
            `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(messagePayload),
            }
          );
          tgData = await retryRes.json();
        }

        return new Response(JSON.stringify({ success: true, telegram: tgData }), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
    }

    // Route 2: POST /api/telegram-webhook
    if (request.method === 'POST' && url.pathname.endsWith('/telegram-webhook')) {
      try {
        const update = (await request.json()) as any;

        // Check if callback query was triggered from inline keyboard
        if (update.callback_query) {
          const callback = update.callback_query;
          const data: string = callback.data || '';
          const messageId = callback.message?.message_id;
          const chatId = callback.message?.chat?.id;
          const originalText = callback.message?.text || '';

          const [action, wishId] = data.split(':');

          if (action === 'approve' && wishId) {
            // Update Firestore document status to 'approved' via REST API
            await updateFirestoreWishStatus(env.FIREBASE_PROJECT_ID, wishId, 'approved');

            // Edit Telegram message
            await fetch(
              `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/editMessageText`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: `${originalText}\n\n✅ <b>Kelin-kuyov tomonidan tasdiqlandi!</b> (To'y devorida jonli ko'rsatilmoqda)`,
                  parse_mode: 'HTML',
                }),
              }
            );

            // Answer callback query with toast
            await fetch(
              `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  callback_query_id: callback.id,
                  text: "✅ Tilak tasdiqlandi va to'y devorida e'lon qilindi!",
                  show_alert: false,
                }),
              }
            );
          } else if (action === 'reject' && wishId) {
            // Update Firestore document status to 'rejected'
            await updateFirestoreWishStatus(env.FIREBASE_PROJECT_ID, wishId, 'rejected');

            // Edit Telegram message
            await fetch(
              `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/editMessageText`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: `${originalText}\n\n❌ <b>Rad etildi</b> (To'y devorida ko'rsatilmaydi)`,
                  parse_mode: 'HTML',
                }),
              }
            );

            await fetch(
              `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  callback_query_id: callback.id,
                  text: "❌ Tilak rad etildi.",
                  show_alert: false,
                }),
              }
            );
          }
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
  },
};

/**
 * Updates a Firestore document status via Firestore REST API (no server SDK required)
 */
async function updateFirestoreWishStatus(
  projectId: string,
  wishId: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/wishes/${wishId}?updateMask.fieldPaths=status`;

  const patchBody = {
    fields: {
      status: {
        stringValue: status,
      },
    },
  };

  const res = await fetch(firestoreUrl, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patchBody),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Firestore REST API error:', errorText);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
