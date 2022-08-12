// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getDatabase

} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import {
  getAuth,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyARdyaXB2FXUY59_i0SjKRtzST0MpoR4MY",
  authDomain: "app-test-heartlink.firebaseapp.com",
  databaseURL: "https://app-test-heartlink-default-rtdb.firebaseio.com",
  projectId: "app-test-heartlink",
  storageBucket: "app-test-heartlink.appspot.com",
  messagingSenderId: "411604046046",
  appId: "1:411604046046:web:12de352c5973512d85b24f",
  measurementId: "G-VS1GE9MMYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const username = prompt("Vui lòng cho chúng tôi biết tên của bạn");
const auth = getAuth(app);
auth.languageCode = "it";

document.getElementById("message-form").addEventListener("submit", sendMessage);

// Message

function sendMessage(e) {
  e.preventDefault();

  debugger;
  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  database.ref("messages/" + timestamp).set({
    username,
    message,
  });

  // set(ref(database, "messages/" + timestamp), {
  //   username,
  //   message,
  // });
}

// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     username === messages.username ? "sent" : "receive"
//   }><span>${messages.username}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });
