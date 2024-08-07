'use client';

import { type FirebaseApp } from 'firebase/app';
import { type Database } from 'firebase/database';
import { createContext, type ReactNode, useContext } from 'react';
import { type Auth } from 'firebase/auth';
import { app, auth, db } from '@/firebase/firebase';

type FirebaseContextType = {
  app: FirebaseApp;
  db: Database;
  auth: Auth;
};

const FirebaseContext = createContext<FirebaseContextType>({
  // @ts-ignore
  app: null,
  // @ts-ignore
  db: null,
  // @ts-ignore
  auth: null,
});

type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  return <FirebaseContext.Provider value={{ app, db, auth }}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext);
  if (!firebase) {
    throw Error('firebaes 가 없음.');
  }

  return firebase;
};
