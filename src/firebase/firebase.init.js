// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbgEgilr0aPO82uTkJHwq2i5_Kjz4baGY",
    authDomain: "torulata-app.firebaseapp.com",
    projectId: "torulata-app",
    storageBucket: "torulata-app.appspot.com",
    messagingSenderId: "388144866974",
    appId: "1:388144866974:web:0521aafd70c530a281fd8f",
    measurementId: "G-2KNHK6S9XQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;