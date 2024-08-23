// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDFBNAZw12T3klVokfpeSLTb73pza6BOTo",
authDomain: "easychatting-f5d09.firebaseapp.com",
projectId: "easychatting-f5d09",
storageBucket: "easychatting-f5d09.appspot.com",
messagingSenderId: "238981480717",
appId: "1:238981480717:web:ff8798b2bac8f24ef6f044",
measurementId: "G-TMEN6HWQLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database 



// apiKey: "AIzaSyDFBNAZw12T3klVokfpeSLTb73pza6BOTo",
// authDomain: "easychatting-f5d09.firebaseapp.com",
// projectId: "easychatting-f5d09",
// storageBucket: "easychatting-f5d09.appspot.com",
// messagingSenderId: "238981480717",
// appId: "1:238981480717:web:ff8798b2bac8f24ef6f044",
// measurementId: "G-TMEN6HWQLX"