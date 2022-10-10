import React from "react";
import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
  return (
    <button
      className="flex items-center justify-center gap-2 w-full
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
