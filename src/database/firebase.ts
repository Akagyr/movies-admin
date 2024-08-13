import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD8xNN2LXwNnpMLwMJi7iQTWzM53S28uCQ',
  authDomain: 'movie-trailers-f28ca.firebaseapp.com',
  projectId: 'movie-trailers-f28ca',
  storageBucket: 'movie-trailers-f28ca.appspot.com',
  messagingSenderId: '53072521148',
  appId: '1:53072521148:web:ad691e0854163951d3edb9',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
