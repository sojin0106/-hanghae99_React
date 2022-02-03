// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDECOU20_gvYlCYEoHdDmzD4cX4ebyXGuA",
    authDomain: "dictproject-29846.firebaseapp.com",
    projectId: "dictproject-29846",
    storageBucket: "dictproject-29846.appspot.com",
    messagingSenderId: "1092322433041",
    appId: "1:1092322433041:web:7a003be383381ab33179b0",
    measurementId: "G-FC28WNR6LL"
};


initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };