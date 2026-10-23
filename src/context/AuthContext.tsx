import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId?: string;
  isDemo?: boolean;
}

export interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isFirebaseConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: () => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const formatAuthError = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Your email or password is incorrect. If you do not have an account, please sign up.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Please sign in instead.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (minimum 6 characters).';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was cancelled or closed. Click the button to try again.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups or open the app in a new tab.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not yet enabled in the Firebase Console. You can sign in using Google, or enable Email/Password in Firebase Authentication settings.';
    case 'auth/unauthorized-domain':
      return 'This web domain is not yet added to Authorized Domains in your Firebase Console.';
    case 'auth/network-request-failed':
      return 'Unable to connect right now. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few moments before trying again.';
    default:
      return 'An authentication error occurred. Please check your information and try again.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if previously in demo session
    const savedDemo = sessionStorage.getItem('nutrimind_demo_user');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUser(parsed);
        setLoading(false);
        return;
      } catch {
        sessionStorage.removeItem('nutrimind_demo_user');
      }
    }

    // Safety timeout: ensure loading screen NEVER hangs permanently (max 1.5 seconds)
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (!isFirebaseConfigured) {
      setLoading(false);
      clearTimeout(safetyTimer);
      return;
    }

    // Listen to Firebase Auth state changes
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(
        auth, 
        (currentUser) => {
          clearTimeout(safetyTimer);
          // If a demo user is active, don't overwrite with null
          const isDemoActive = sessionStorage.getItem('nutrimind_demo_user');
          if (isDemoActive) {
            setLoading(false);
            return;
          }

          if (currentUser) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              providerId: currentUser.providerData?.[0]?.providerId || 'password',
              isDemo: false
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          console.warn('onAuthStateChanged notice:', error);
          clearTimeout(safetyTimer);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn('Firebase onAuthStateChanged setup error:', err);
      clearTimeout(safetyTimer);
      setLoading(false);
    }

    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    sessionStorage.removeItem('nutrimind_demo_user');
    if (!isFirebaseConfigured) {
      // In unconfigured / offline demo mode, sign in immediately as local user
      const demoUser: AppUser = {
        uid: `user_${Date.now()}`,
        email: email.trim(),
        displayName: email.split('@')[0] || 'NutriMind Explorer',
        photoURL: null,
        providerId: 'password',
        isDemo: true
      };
      sessionStorage.setItem('nutrimind_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    sessionStorage.removeItem('nutrimind_demo_user');
    if (!isFirebaseConfigured) {
      const demoUser: AppUser = {
        uid: `user_${Date.now()}`,
        email: email.trim(),
        displayName: displayName.trim() || email.split('@')[0] || 'NutriMind Explorer',
        photoURL: null,
        providerId: 'password',
        isDemo: true
      };
      sessionStorage.setItem('nutrimind_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (displayName.trim() && credential.user) {
      await updateProfile(credential.user, {
        displayName: displayName.trim()
      });
      setUser({
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: displayName.trim(),
        photoURL: credential.user.photoURL,
        providerId: 'password',
        isDemo: false
      });
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    sessionStorage.removeItem('nutrimind_demo_user');
    if (!isFirebaseConfigured) {
      signInAsDemo();
      return;
    }
    await signInWithPopup(auth, googleProvider);
  };

  const signInAsDemo = (): void => {
    const demoUser: AppUser = {
      uid: 'demo-nutrimind-preview',
      email: 'demo@nutrimind.app',
      displayName: 'Demo Explorer',
      photoURL: null,
      providerId: 'demo',
      isDemo: true
    };
    sessionStorage.setItem('nutrimind_demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const signOut = async (): Promise<void> => {
    sessionStorage.removeItem('nutrimind_demo_user');
    setUser(null);
    try {
      await firebaseSignOut(auth);
    } catch {
      // Ignore if not signed into Firebase auth
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signInWithGoogle,
    signInAsDemo,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};