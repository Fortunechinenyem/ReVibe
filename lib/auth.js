import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
