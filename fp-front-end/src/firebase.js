import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCmqF3lURcgoGMymERF-ZxD7OCAGe1fxOM',
  authDomain: 'fppweb-bf40e.firebaseapp.com',
  projectId: 'fppweb-bf40e',
  storageBucket: 'fppweb-bf40e.appspot.com',
  messagingSenderId: '30430357630',
  appId: '1:30430357630:web:d0ecec7e64bec7b8ee902f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);