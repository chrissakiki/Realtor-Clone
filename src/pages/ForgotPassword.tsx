import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import AuthImage from "../components/AuthImage";
import AuthInput from "../components/AuthInput";
import OAuth from "../components/OAuth";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex-cc flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="w-[95%] md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <AuthImage />
        </div>
        <div className="w-[95%] md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <AuthInput
              type="email"
              value={email}
              placeholder="Email Address"
              handleChange={handleChange}
            />

            <div className="flex-bc flex-wrap md:text-sm text-base gap-4">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <AuthButton text="Reset Password" />
            <div className="my-4  flex items-center before:flex-1 before:border-t  before:border-gray-300 after:flex-1 after:border-t  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
