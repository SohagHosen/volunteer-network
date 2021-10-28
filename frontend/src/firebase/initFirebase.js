import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.firebase";
const initFirebase = () => {
  initializeApp(firebaseConfig);
};
export default initFirebase;
