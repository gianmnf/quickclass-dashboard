import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD39KIWEKRwmKfXlHQrMWeE1a2M3lANf_c",
    authDomain: "quickclass-7149f.firebaseapp.com",
    databaseURL: "https://quickclass-7149f.firebaseio.com",
    projectId: "quickclass-7149f",
    storageBucket: "quickclass-7149f.appspot.com",
    messagingSenderId: "1071424142938",
    appId: "1:1071424142938:web:a021f3a9b30998ff80e263",
    measurementId: "G-QR9TGCV5QQ"
  };
  // Initialize Firebase
var firebaseDb = firebase.initializeApp(firebaseConfig);

export default firebaseDb.firestore();