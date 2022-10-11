import React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return {
    loggedIn,
    loading,
  };
};

export default useAuthStatus;
