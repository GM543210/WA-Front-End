import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCUblSBOHHmTyTsX6DM-y-lHO0oidDNdz4",
    authDomain: "exqse-me-redomat.firebaseapp.com",
    projectId: "exqse-me-redomat",
    storageBucket: "exqse-me-redomat.appspot.com",
    messagingSenderId: "636266329778",
    appId: "1:636266329778:web:311e07334eaa98515bbbab"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
let db = firebase.firestore();
let storage = firebase.storage();

export default db;

export { firebase, storage };