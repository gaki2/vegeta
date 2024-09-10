// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from '@firebase/storage';
import { GoogleAuthProvider } from 'firebase/auth';

const LOCAL_HOST = 'http://localhost:3000';

const firebaseConfig = {
  apiKey: 'AIzaSyD9uEqeWpn4NMH6NqYpCTVrb16xCpYObFA',
  authDomain: 'vegeta-423eb.firebaseapp.com',
  // authDomain: LOCAL_HOST,
  projectId: 'vegeta-423eb',
  storageBucket: 'vegeta-423eb.appspot.com',
  messagingSenderId: '11573774412',
  appId: '1:11573774412:web:dbfb79b9d4747449150ce9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// realtime db
export const db = getDatabase(
  app,
  'https://vegeta-423eb-default-rtdb.asia-southeast1.firebasedatabase.app'
);

export const auth = getAuth(app);

// 이미지, 동영상 등 정적 에셋 저장소
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
