import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPC5-aBCUPkxn44_Fibgxycnsq_gmtTxo",
  authDomain: "clinic-f06ee.firebaseapp.com",
  projectId: "clinic-f06ee",
  storageBucket: "clinic-f06ee.appspot.com",
  messagingSenderId: "468667427971",
  appId: "1:468667427971:web:8d69332e2729dd03673fb6",
  measurementId: "G-Y2JWPE2YDP",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
