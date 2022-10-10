import React from "react";

interface Props {
  text: string;
}
const AuthButton: React.FC<Props> = ({ text }) => {
  return (
    <button
      className="mt-5 w-full bg-blue-600 text-white py-2 text-base font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in hover:shadow-lg active:bg-blue-800"
      type="submit"
    >
      {text}
    </button>
  );
};

export default AuthButton;
