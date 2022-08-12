
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyARdyaXB2FXUY59_i0SjKRtzST0MpoR4MY",
  authDomain: "app-test-heartlink.firebaseapp.com",
  databaseURL: "https://app-test-heartlink-default-rtdb.firebaseio.com",
  projectId: "app-test-heartlink",
  storageBucket: "app-test-heartlink.appspot.com",
  messagingSenderId: "411604046046",
  appId: "1:411604046046:web:12de352c5973512d85b24f",
  measurementId: "G-VS1GE9MMYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

logoutInfor.addEventListener("click", (e) => {
  debugger;
  signOut(auth)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("Error");
    });
});
