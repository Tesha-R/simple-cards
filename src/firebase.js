import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvREc2OMQ_kODhihqiQe3cf44GVA9ok1U',
  authDomain: 'fir-frontend-e6941.firebaseapp.com',
  projectId: 'fir-frontend-e6941',
  storageBucket: 'fir-frontend-e6941.appspot.com',
  messagingSenderId: '281867629084',
  appId: '1:281867629084:web:19787b480b57a8bf2065d9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
