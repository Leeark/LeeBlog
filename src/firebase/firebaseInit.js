import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGP8Vq9vr8BHs1wZspjGFRN0dle2T4_7Q",
    authDomain: "leeblog-ade11.firebaseapp.com",
    projectId: "leeblog-ade11",
    storageBucket: "leeblog-ade11.appspot.com",
    messagingSenderId: "16622419570",
    appId: "1:16622419570:web:dc3618687fd6c080f98ceb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }
export default firebaseApp.firestore();