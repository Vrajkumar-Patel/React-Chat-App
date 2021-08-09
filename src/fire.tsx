import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdcOWIDnkoo2tqRH5KRvr7ahPj7CB63TY",
    authDomain: "chat-app-c9b8e.firebaseapp.com",
    projectId: "chat-app-c9b8e",
    storageBucket: "chat-app-c9b8e.appspot.com",
    messagingSenderId: "582643018511",
    appId: "1:582643018511:web:c94563f17ffd5e4394ec7a"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };