import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAyLWeec8NXVjcOsmHa7NUEO-sIIqWN1Q8",
  authDomain: "employee-reg-525b2.firebaseapp.com",
  projectId: "employee-reg-525b2",
  storageBucket: "employee-reg-525b2.appspot.com",
  messagingSenderId: "545465225346",
  appId: "1:545465225346:web:0772af9ee7af57846c249b"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)