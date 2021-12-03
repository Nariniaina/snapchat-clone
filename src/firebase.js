//to use firebase app
// import firebase from 'firebase/app'; //older version
import firebase from 'firebase/compat/app'; //v9
//to use auth
// import 'firebase/auth'; //older version
import 'firebase/compat/auth'; //v9
//to use firestore
// import 'firebase/firestore'; //Older Version
import 'firebase/compat/firestore'; //v9

//to use Storage
// import 'firebase/storage'; //Older Version
import 'firebase/compat/storage'; //v9

const firebaseConfig = {
    apiKey: "AIzaSyBYGxfVL6WJsUCW3xDJljz6m1nR3QeCFwg",
    authDomain: "snapchat-clone-1310b.firebaseapp.com",
    projectId: "snapchat-clone-1310b",
    storageBucket: "snapchat-clone-1310b.appspot.com",
    messagingSenderId: "42615405632",
    appId: "1:42615405632:web:27ca9e85d23685cdbf33a5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
// To connect your app with firebase, database
const db = firebaseApp.firestore();
// to get the db
const auth = firebase.auth();
// to get the auth function of firebase

// New ======= STORAGE ===========
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };