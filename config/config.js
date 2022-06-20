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
  signInWithCredential,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Config
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
const database = getDatabase(app);
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

const provider = new GoogleAuthProvider();

// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "nguyenvanducdev@gmail.com",
});

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
      window.location.assign("/html/Profile/profile.html");

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
const providerFace = new FacebookAuthProvider();

singFacebook.addEventListener("click", (e) => {
  debugger;
  signInWithPopup(auth, providerFace)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.

      console.log("User>>Goole>>>>", user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
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
  {},
  auth
);
recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

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

// function process(event) {
//   event.preventDefault();
// debugger
//   const phoneNumber = phoneInput.getNumber();
//   $('#exampleModalPhoneNumber').modal('hide')
//   $('#exampleModalCodeQR').modal('show')
//   debugger
// }
