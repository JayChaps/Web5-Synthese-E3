// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, increment } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

    // Le bon : 
const firebaseConfig = {
    apiKey: "AIzaSyCY0_e67aqCFxs2mgerWMJY9djaX5KeMBI",
    authDomain: "auth-web5-synthese-2023.firebaseapp.com",
    projectId: "auth-web5-synthese-2023",
    storageBucket: "auth-web5-synthese-2023.appspot.com",
    messagingSenderId: "482469779336",
    appId: "1:482469779336:web:7f5adfecb8a32d763d0c3d"
};

    // Le mien :
// const firebaseConfig = {
//     apiKey: "AIzaSyCO3LanYtBbIbp64UKSEETMqhHagJOP75w",
//     authDomain: "web5-synthese-temp.firebaseapp.com",
//     projectId: "web5-synthese-temp",
//     storageBucket: "web5-synthese-temp.appspot.com",
//     messagingSenderId: "413401273592",
//     appId: "1:413401273592:web:17a7a8d6703dff495d970d"
// };
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//TEst
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCE4VOxdEkz0A2xjA6OZi9t8M9og6i7tfU",
//   authDomain: "test-web-5-b157d.firebaseapp.com",
//   projectId: "test-web-5-b157d",
//   storageBucket: "test-web-5-b157d.appspot.com",
//   messagingSenderId: "790446844844",
//   appId: "1:790446844844:web:ac9190cce27e4318a1a809"
// };

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const incrementValue = increment;
