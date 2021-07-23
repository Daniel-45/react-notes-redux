import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBs35EtamGmKZodB9m6X77n60w7f5WI-IU",
    authDomain: "react-journal-92aa7.firebaseapp.com",
    projectId: "react-journal-92aa7",
    storageBucket: "react-journal-92aa7.appspot.com",
    messagingSenderId: "662888189292",
    appId: "1:662888189292:web:0ea5b11efc14ca6f033749"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}