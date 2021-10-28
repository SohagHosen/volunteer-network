import { useEffect, useState } from "react";
import initFirebase from "../firebase/initFirebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

initFirebase();
const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  return { user, signIn, logout, loading, setLoading };
};

export default useFirebase;
