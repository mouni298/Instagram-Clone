 
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBsYjboOdqnYfrxsdNYGJ_6svBkernLfc4",
  authDomain: "insta-clone-89607.firebaseapp.com",
  projectId: "insta-clone-89607",
  storageBucket: "insta-clone-89607.appspot.com",
  messagingSenderId: "427729799672",
  appId: "1:427729799672:web:cef770a5399a7232736e0d"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {db,auth,storage}