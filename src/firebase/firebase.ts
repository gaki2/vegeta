// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD9uEqeWpn4NMH6NqYpCTVrb16xCpYObFA',
  authDomain: 'vegeta-423eb.firebaseapp.com',
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
