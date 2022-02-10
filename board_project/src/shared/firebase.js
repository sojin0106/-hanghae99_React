import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAYYjhSgJGA0YZq4K8mBWY1YTAjS8TcmxM",
    authDomain: "board-project-879b0.firebaseapp.com",
    projectId: "board-project-879b0",
    storageBucket: "board-project-879b0.appspot.com",
    messagingSenderId: "1056465098324",
    appId: "1:1056465098324:web:1b872c4093573e46847fc1",
    measurementId: "G-7PG2Y1H145"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };