import * as firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVNklPKADm0OM9FsBd3ZV_MQuv1Q5saAA",
  authDomain: "bt3103-24343.firebaseapp.com",
  databaseURL: "https://bt3103-24343.firebaseio.com",
  projectId: "bt3103-24343",
  storageBucket: "bt3103-24343.appspot.com",
  messagingSenderId: "183167898524",
  appId: "1:183167898524:web:9833a894549afcdf7eee59",
  measurementId: "G-V5RM3M5FSF"
};

// firebase.initializeApp(firebaseConfig);
// var database = firebase.firestore();
// export default database;

export default !firebase.apps.length 
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();
