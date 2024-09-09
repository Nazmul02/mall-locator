import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCRLm_rdPMLBD4b_QgQUwc8bRf06tclyc8",
    authDomain: "mall-locator-435bb.firebaseapp.com",
    projectId: "mall-locator-435bb",
    storageBucket: "mall-locator-435bb.appspot.com",
    messagingSenderId: "695784965916",
    appId: "1:695784965916:web:798b7e995c9e3589c35cd9"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { auth };



