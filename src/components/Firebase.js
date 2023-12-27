//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn14ai30I0Ts4frfixgPT92NrzMTfy3QU",
  authDomain: "care-call-2b79d.firebaseapp.com",
  projectId: "care-call-2b79d",
  storageBucket: "care-call-2b79d.appspot.com",
  messagingSenderId: "468011365324",
  appId: "1:468011365324:web:f3f14d15c62ddd98526369",
  measurementId: "G-ZZNEYWNXVR",
  databaseURL: "https://care-call-2b79d-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
// import {getAuth} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyD5aywLeJL580oJm73Uqm4qOUiN16mOEuk",
//   authDomain: "carecall-ebe.firebaseapp.com",
//   projectId: "carecall-ebe",
//   storageBucket: "carecall-ebe.appspot.com",
//   messagingSenderId: "661438591662",
//   appId: "1:661438591662:web:d1bf94cee456c148e9733f",
//   measurementId: "G-57RB7SFJG0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const database = getDatabase(app);
// export const auth = getAuth(app);