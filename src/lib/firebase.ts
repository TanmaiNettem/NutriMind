import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  browserLocalPersistence, 
  setPersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Safely load local firebase-applet-config.json if present in development, without failing if gitignored
const configModules = import.meta.glob<{ default: Record<string, string> }>('/firebase-applet-config.json', { eager: true });
const localConfig = configModules['/firebase-applet-config.json']?.default || {};

const rawApiKey = (import.meta.env.VITE_FIREBASE_API_KEY as string) || localConfig.apiKey || '';
const rawProjectId = (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || localConfig.projectId || '';

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  rawApiKey && 
  rawProjectId && 
  rawApiKey.trim() !== '' && 
  rawProjectId.trim() !== '' &&
  !rawApiKey.includes('your-firebase') &&
  !rawProjectId.includes('your-firebase')
);

// Fallback demo config prevents Firebase SDK from throwing uncaught exceptions during module evaluation
const firebaseConfig = isFirebaseConfigured
  ? {
      apiKey: rawApiKey,
      authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || localConfig.authDomain || `${rawProjectId}.firebaseapp.com`,
      projectId: rawProjectId,
      storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || localConfig.storageBucket || `${rawProjectId}.firebasestorage.app`,
      messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || localConfig.messagingSenderId || '1234567890',
      appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || localConfig.appId || '1:1234567890:web:abcdef123456',
    }
  : {
      apiKey: 'AIzaSyDemoNutriMindKeyForFrontend12345',
      authDomain: 'nutrimind-demo.firebaseapp.com',
      projectId: 'nutrimind-demo',
      storageBucket: 'nutrimind-demo.appspot.com',
      messagingSenderId: '123456789012',
      appId: '1:123456789012:web:demo1234567890ab',
    };

// Initialize Firebase exactly once safely
let appInstance;
try {
  appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (err) {
  console.warn('Firebase initializeApp notice:', err);
  appInstance = getApps().length > 0 ? getApp() : initializeApp({
    apiKey: 'AIzaSyDemoNutriMindKeyForFrontend12345',
    projectId: 'nutrimind-demo',
    appId: '1:123456789012:web:demo1234567890ab'
  });
}
const app = appInstance;

// Initialize Firebase Authentication safely
let authInstance: ReturnType<typeof getAuth>;
try {
  authInstance = getAuth(app);
  if (isFirebaseConfigured) {
    setPersistence(authInstance, browserLocalPersistence).catch((error) => {
      console.warn('Could not set persistence:', error);
    });
  }
} catch (err) {
  console.warn('Firebase getAuth notice:', err);
  authInstance = getAuth(app);
}
export const auth = authInstance;

// Initialize Cloud Firestore with configured database ID safely
const rawDbId = (import.meta.env.VITE_FIREBASE_DATABASE_ID as string) || localConfig.firestoreDatabaseId;
let dbInstance: ReturnType<typeof getFirestore>;
try {
  dbInstance = rawDbId && rawDbId !== '(default)'
    ? getFirestore(app, rawDbId)
    : getFirestore(app);
} catch (err) {
  console.warn('Firebase getFirestore notice:', err);
  dbInstance = getFirestore(app);
}
export const db = dbInstance;

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;