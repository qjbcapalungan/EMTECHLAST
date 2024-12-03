// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'; // Import Realtime Database if you plan to use it

const firebaseConfig = {
  apiKey: "AIzaSyAej5HdoJNtbzjy172Hn1fXx9XAaGpHcgk",
  authDomain: "emtech-mobile-application.firebaseapp.com",
  databaseURL: "https://emtech-mobile-application-default-rtdb.firebaseio.com", // Add your Realtime Database URL
  projectId: "emtech-mobile-application",
  storageBucket: "emtech-mobile-application.appspot.com",
  messagingSenderId: "163076269838",
  appId: "1:163076269838:android:88672d912c6078a6ae595f",
};

console.log('Attempting to initialize Firebase');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

console.log('Firebase initialized successfully');

export default firebase;
