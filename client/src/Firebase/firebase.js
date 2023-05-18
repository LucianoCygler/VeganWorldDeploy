import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration

const {
  REACT_APP_FIRE_BASE_KEY,
  REACT_APP_FIRE_BASE_DOMAIN,
  REACT_APP_FIRE_BASE_PROJECT_ID,
  REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  REACT_APP_FIRE_BASE_SENDER_ID,
  REACT_APP_FIRE_BASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIRE_BASE_KEY,
  authDomain: REACT_APP_FIRE_BASE_DOMAIN,
  projectId: REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIRE_BASE_SENDER_ID,
  appId: REACT_APP_FIRE_BASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const gitProvider = new GithubAuthProvider();
