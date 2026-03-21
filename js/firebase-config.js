/**
 * Firebase Configuration
 * ProCoach AI - Multi-Sport Coaching Platform
 *
 * Replace the placeholder values below with your real Firebase project config.
 * Until then, the app runs in local-only mode (localStorage).
 */
let firebaseReady = false;
let auth = null;
let db = null;

const firebaseConfig = {
  apiKey: "AIzaSyDplaceholder",
  authDomain: "procoach-ai.firebaseapp.com",
  projectId: "procoach-ai",
  storageBucket: "procoach-ai.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};

// Only initialize Firebase if real config is present
if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('placeholder')) {
  try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
    firebaseReady = true;
  } catch (e) {
    console.warn('Firebase init failed, using local mode:', e);
  }
} else {
  console.info('ProCoach AI running in local mode (no Firebase config).');
}
