'use client';

import {
  initializeApp,
  getApp,
  getApps,
  FirebaseApp,
  FirebaseOptions,
} from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Re-export hooks and providers
export { FirebaseProvider, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';
// Re-export error handling utilities
export { FirestorePermissionError } from './errors';
export { errorEmitter } from './error-emitter';


let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase(config: FirebaseOptions = firebaseConfig) {
  if (getApps().length === 0) {
    app = initializeApp(config);
    auth = getAuth(app);
    firestore = getFirestore(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
  return { app, auth, firestore };
}
