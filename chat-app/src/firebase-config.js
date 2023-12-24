import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1rqoyF1fXS89pxcfwk9idscQi-V-lr8k",
    authDomain: "chat-app-d6ed3.firebaseapp.com",
    projectId: "chat-app-d6ed3",
    storageBucket: "chat-app-d6ed3.appspot.com",
    messagingSenderId: "952360755296",
    appId: "1:952360755296:web:edeb8ab008dfeacedea305"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();