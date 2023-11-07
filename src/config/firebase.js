// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY0_e67aqCFxs2mgerWMJY9djaX5KeMBI",
    authDomain: "auth-web5-synthese-2023.firebaseapp.com",
    projectId: "auth-web5-synthese-2023",
    storageBucket: "auth-web5-synthese-2023.appspot.com",
    messagingSenderId: "482469779336",
    appId: "1:482469779336:web:7f5adfecb8a32d763d0c3d"
};

// Initialize Firebase
export const auth = getAuth(app);
const app = initializeApp(firebaseConfig);