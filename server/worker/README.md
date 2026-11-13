# Bekzod & Parvina Wedding - Telegram Moderation Cloudflare Worker

This lightweight serverless Cloudflare Worker handles the couple moderation workflow:
1. When a guest writes a wish on the wedding website, the site sends it to this worker (`/api/notify-wish`).
2. The worker sends an instant Telegram alert to Bekzod with inline action buttons `[✅ Tasdiqlash (Devorga chiqarish)]` and `[❌ Rad etish]`.
3. When the couple taps the button in Telegram, Telegram calls `/api/telegram-webhook`, which updates the wish in Firebase Firestore (`status = 'approved'`).
4. The approved wish immediately appears in real time on the wedding landing page for all guests!

---

## 🚀 Quick Setup Guide (Takes ~3 minutes)

### Step 1: Create Your Telegram Bot
1. Open Telegram and search for `@BotFather`.
2. Send `/newbot`.
3. Give your bot a name (e.g. `Bekzod & Parvina To'y Boti`) and a username (e.g. `bekzod_parvina_wedding_bot`).
4. Copy the **HTTP API Token** (e.g. `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`).
5. Open Telegram, start your new bot (press `/start`), and send any message.
6. To get your personal Telegram **Chat ID**, search for `@userinfobot` in Telegram, send `/start`, and copy your `Id` (e.g. `987654321`).

---

### Step 2: Deploy or Run the Cloudflare Worker
1. In the `server/worker` folder, configure `wrangler.toml` or set your secrets:
   ```bash
   cd server/worker
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   npx wrangler secret put FIREBASE_PROJECT_ID
   ```
2. Deploy to Cloudflare Workers (100% free, 100k requests/day):
   ```bash
   npx wrangler deploy
   ```
   You will get a public URL like:
   `https://wedding-moderation-worker.<your-subdomain>.workers.dev`

---

### Step 3: Register Telegram Webhook (One-line command)
Tell Telegram to send button clicks to your worker:
```bash
curl -F "url=https://wedding-moderation-worker.<your-subdomain>.workers.dev/api/telegram-webhook" \
  https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/setWebhook
```
Telegram will reply:
`{"ok":true,"result":true,"description":"Webhook was set"}`

---

### Step 4: Add to Wedding App `.env`
In your root wedding invitation folder, add the worker URL to `.env`:
```env
VITE_TELEGRAM_WORKER_URL=https://wedding-moderation-worker.<your-subdomain>.workers.dev
```

That's it! Every new wish will now notify you on Telegram with instant one-tap approval buttons!
