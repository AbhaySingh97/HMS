// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXt7DGOUSZx0FyODkQv0pyIGc_ten2iFM",
    authDomain: "hms-services.firebaseapp.com",
    projectId: "hms-services",
    storageBucket: "hms-services.firebasestorage.app",
    messagingSenderId: "643923980378",
    appId: "1:643923980378:web:f7e3dce23bec2d6c3f2863"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();