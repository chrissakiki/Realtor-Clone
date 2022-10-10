import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  text: string;
  loading: boolean;
}
const AuthButton: React.FC<Props> = ({ text, loading }) => {
  return (
    <button
      className="flex-cc mt-5 w-full bg-blue-600 text-white h-10 text-base font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in hover:shadow-lg active:bg-blue-800"
      type="submit"
    >
      {loading ? <AiOutlineLoading3Quarters className="spinner" /> : text}
    </button>
  );
};

export default AuthButton;
