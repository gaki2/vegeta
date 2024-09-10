'use client';

import { type FirebaseApp } from 'firebase/app';
import { type Database } from 'firebase/database';
import { createContext, type ReactNode, useContext } from 'react';
import { type Auth, GoogleAuthProvider } from 'firebase/auth';
import { app, auth, db, storage, googleProvider } from '@/firebase/firebase';
import { type FirebaseStorage } from '@firebase/storage';

type FirebaseContextType = {
  app: FirebaseApp;
  db: Database;
  auth: Auth;
  storage: FirebaseStorage;
  googleProvider: GoogleAuthProvider;
};

const FirebaseContext = createContext<FirebaseContextType>({
  // @ts-ignore
  app: null,
  // @ts-ignore
  db: null,
  // @ts-ignore
  auth: null,
  // @ts-ignore
  storage: null,
  // @ts-ignore
  googleProvider: null,
});

type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  return (
    <FirebaseContext.Provider value={{ app, db, auth, storage, googleProvider }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw Error('firebaes 가 없음.');
  }

  return firebase;
};
