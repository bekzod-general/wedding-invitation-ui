import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  increment,
  serverTimestamp,
  type Firestore,
  type Unsubscribe,
} from 'firebase/firestore';
import { Wish } from '../data/weddingData';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
  } else {
    console.warn('Firebase configuration missing from environment.');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const isFirebaseConfigured = (): boolean => {
  return Boolean(db && firebaseConfig.apiKey && firebaseConfig.projectId);
};

/**
 * Subscribes ONLY to real approved wishes from Firestore.
 * Zero mock data, zero local storage.
 */
export const subscribeToApprovedWishes = (
  onUpdate: (wishes: Wish[]) => void
): Unsubscribe => {
  if (!db) {
    console.warn('Firestore is not ready. Waiting for valid configuration...');
    onUpdate([]);
    return () => {};
  }

  try {
    const wishesCol = collection(db, 'wishes');
    const q = query(wishesCol, where('status', '==', 'approved'));

    return onSnapshot(
      q,
      (snapshot) => {
        const remoteWishes: Wish[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const createdAtMillis = data.createdAt?.toMillis
            ? data.createdAt.toMillis()
            : typeof data.createdAt === 'number'
            ? data.createdAt
            : Date.now();

          const dateObj = new Date(createdAtMillis);
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');

          remoteWishes.push({
            id: docSnap.id,
            name: data.name || '',
            initials: data.initials || 'BP',
            relationshipKey: data.relationshipKey || 'friends',
            message: data.message || '',
            hearts: typeof data.hearts === 'number' ? data.hearts : 1,
            status: data.status || 'approved',
            time: `${hours}:${minutes}`,
            dateType: 'today',
            createdAt: createdAtMillis,
          });
        });

        // Sort latest first
        remoteWishes.sort((a, b) => {
          const timeA = typeof a.createdAt === 'number' ? a.createdAt : 0;
          const timeB = typeof b.createdAt === 'number' ? b.createdAt : 0;
          return timeB - timeA;
        });

        onUpdate(remoteWishes);
      },
      (error) => {
        console.error('Firestore onSnapshot error:', error);
        onUpdate([]);
      }
    );
  } catch (err) {
    console.error('Failed to create Firestore listener:', err);
    onUpdate([]);
    return () => {};
  }
};

export interface SubmitWishPayload {
  name: string;
  initials: string;
  relationshipKey: string;
  message: string;
  virtualGift: string;
}

/**
 * Submits a new wish directly to Firestore with status: 'pending'.
 * Triggers the Telegram Cloudflare Worker notification.
 */
export const submitGuestWish = async (
  payload: SubmitWishPayload
): Promise<{ id: string; status: 'pending' }> => {
  if (!db) {
    throw new Error('Firestore is not configured. Please check your .env variables.');
  }

  const fullMessage = `${payload.virtualGift} ${payload.message}`.trim();
  const wishesCol = collection(db, 'wishes');

  // 1. Write document to Firestore with a 6-second safety timeout
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            "Firestore ulanish vaqti tugadi. Iltimos, Firebase konsolida (Build -> Firestore Database) 'Create database' tugmasini bosganingizni tekshiring."
          )
        ),
      6000
    )
  );

  const docRef = await Promise.race([
    addDoc(wishesCol, {
      name: payload.name.trim(),
      initials: payload.initials,
      relationshipKey: payload.relationshipKey,
      message: fullMessage,
      hearts: 1,
      status: 'pending',
      createdAt: serverTimestamp(),
    }),
    timeoutPromise,
  ]);

  const actualId = docRef.id;

  // 2. Notify Telegram Bot via Cloudflare Worker
  const rawWorkerUrl = import.meta.env.VITE_TELEGRAM_WORKER_URL || '';
  const workerBaseUrl = rawWorkerUrl
    .replace(/\/api\/telegram-webhook\/?$/, '')
    .replace(/\/api\/notify-wish\/?$/, '')
    .replace(/\/$/, '');

  if (workerBaseUrl) {
    try {
      await fetch(`${workerBaseUrl}/api/notify-wish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wishId: actualId,
          name: payload.name.trim(),
          initials: payload.initials,
          relationshipKey: payload.relationshipKey,
          message: fullMessage,
          virtualGift: payload.virtualGift,
        }),
      });
    } catch (notifyErr) {
      console.error('Telegram notification worker call failed:', notifyErr);
    }
  }

  return { id: actualId, status: 'pending' };
};

/**
 * Atomically increments or decrements hearts in Firestore.
 */
export const toggleWishHeart = async (
  wishId: string,
  delta: 1 | -1
): Promise<void> => {
  if (!db) return;
  try {
    const wishRef = doc(db, 'wishes', wishId);
    await updateDoc(wishRef, {
      hearts: increment(delta),
    });
  } catch (err) {
    console.error('Firestore heart increment error:', err);
  }
};
