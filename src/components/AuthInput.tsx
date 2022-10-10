import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  type: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthInput: React.FC<Props> = ({
  type,
  value,
  placeholder,
  handleChange,
  showPassword,
  setShowPassword,
}) => {
  // if type is password return input password with extra util
  if (type === "password" && setShowPassword) {
    return (
      <>
        <input
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />

        <span
          className="absolute right-3 top-3 text-xl text-gray-900 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </>
    );
  }

  return (
    <input
      className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
      type={type}
      id={type}
      name={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default AuthInput;
