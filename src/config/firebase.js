// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

    // Le bon : 
// const firebaseConfig = {
//     apiKey: "AIzaSyCY0_e67aqCFxs2mgerWMJY9djaX5KeMBI",
//     authDomain: "auth-web5-synthese-2023.firebaseapp.com",
//     projectId: "auth-web5-synthese-2023",
//     storageBucket: "auth-web5-synthese-2023.appspot.com",
//     messagingSenderId: "482469779336",
//     appId: "1:482469779336:web:7f5adfecb8a32d763d0c3d"
// };

    // Le mien :
const firebaseConfig = {
    apiKey: "AIzaSyCO3LanYtBbIbp64UKSEETMqhHagJOP75w",
    authDomain: "web5-synthese-temp.firebaseapp.com",
    projectId: "web5-synthese-temp",
    storageBucket: "web5-synthese-temp.appspot.com",
    messagingSenderId: "413401273592",
    appId: "1:413401273592:web:17a7a8d6703dff495d970d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
