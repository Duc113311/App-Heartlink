// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
import {
  getAuth,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithRedirect,
  signInWithCredential,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";

const phoneInputField = document.querySelector("#phone");
const uploadFileImage = document.querySelector("#uploadFile");

const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

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

// Login Email

signUp.addEventListener("click", (e) => {
  debugger;
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      window.location.assign("/html/Profile/profile.html");
    })
    .catch((error) => {
      alert("Error");
    });
});

// login gg

//const provider = new GoogleAuthProvider();

// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
// provider.setCustomParameters({
//   login_hint: "",
// });

singGoogle.addEventListener("click", (e) => {
  debugger;
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      debugger;
      // The signed-in user info.
      const user = result.user;
      console.log(token);
      console.log("User>>Goole>>>>", user);
      window.localStorage.setItem("accessToken", JSON.stringify(token));

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      console.log(errorMessage);
      console.log(provider);
      console.log(errorCode);

      //const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// Facebook

// Login Facebook
const provider = new FacebookAuthProvider();
provider.addScope("user_birthday");
auth.languageCode = "it";
provider.setCustomParameters({
  display: "popup",
});
singFacebook.addEventListener("click", (e) => {
  debugger;
  signInWithPopup(auth, provider)
    .then((result) => {
      debugger;
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // ...
    })
    .catch((error) => {
      debugger;
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});

// Phone Number
// recapcha
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  { size: "invisible" },
  auth
);
// recaptchaVerifier.render().then((widgetId) => {
//   window.recaptchaWidgetId = widgetId;
// });

getCode.addEventListener("click", (e) => {
  debugger;
  const phoneNumber = phoneInput.getNumber();
  // const phoneNumber = document.getElementById("phoneNumber").value;
  const appVerifier = window.recaptchaVerifier;
  $("#exampleModalPhoneNumber").modal("hide");
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      debugger;

      const sentCodeId = confirmationResult.verificationId;
      signInWithPhone.addEventListener("click", (e) =>
        singWithPhone(sentCodeId)
      );
    })
    .catch((error) => {
      debugger;
      console.log(error);
      // Error; SMS not sent
      // ...
    });
});

const singWithPhone = (sentCodeId) => {
  const code = document.getElementById("codeQR").value;
  const credential = PhoneAuthProvider.credential(sentCodeId, code);
  signInWithCredential(auth, credential)
    .then((result) => {
      debugger;
      window.location.assign("/html/Profile/profile.html");
    })
    .catch((error) => {
      alert("error", error);
    });
};
let fileImage = {};

btnFileUpload.addEventListener("click", (e) => {
  debugger;

  let fileUpload = uploadFileImage.files[0];
  debugger;
  const storage = getStorage();

  const storageRef = ref(storage, "some-child/" + fileUpload.name);

  uploadBytes(storageRef, fileUpload).then((snapshot) => {
    debugger;
    console.log("Uploaded a blob or file!");
    console.log(snapshot);
  });

  getDownloadURL(storageRef, fileUpload)
    .then((url) => {
      debugger;
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myImg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
});

// document.getElementById("message-form").addEventListener("submit", sendMessage);

// // Message

// function sendMessage(e) {
//   e.preventDefault();

//   debugger;
//   // get values to be submitted
//   const timestamp = Date.now();
//   const messageInput = document.getElementById("message-input");
//   const message = messageInput.value;

//   // clear the input box
//   messageInput.value = "";

//   //auto scroll to bottom
//   document
//     .getElementById("messages")
//     .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//   // create db collection and send in the data
//   db.ref("messages/" + timestamp).set({
//     username,
//     message,
//   });
// }

// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     username === messages.username ? "sent" : "receive"
//   }><span>${messages.username}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });
