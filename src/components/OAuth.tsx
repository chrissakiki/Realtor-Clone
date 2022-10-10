import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message.split("Firebase:")[1]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex-cc gap-2 w-full
    bg-red-600 text-white py-2 capitalize text-base font-medium hover:bg-red-700 active:bg-red-800
    shadow-md hover:shadow-lg transition duration-200 ease-in-out rounded
    "
    >
      <FcGoogle className="text-2xl bg-white rounded-full" /> Continue with
      Google
    </button>
  );
};

export default OAuth;
