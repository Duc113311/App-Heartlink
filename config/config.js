// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQNvZf4Kxu36oYP8jZvZR2qL12ao3rHak",
  authDomain: "app-heartlink.firebaseapp.com",
  projectId: "app-heartlink",
  storageBucket: "app-heartlink.appspot.com",
  messagingSenderId: "136104391912",
  appId: "1:136104391912:web:6e37ae3f3e73b062c8455d",
  measurementId: "G-7F2VXPT5GR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
