import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "../components/AuthButton";
import AuthImage from "../components/AuthImage";
import AuthInput from "../components/AuthInput";
import OAuth from "../components/OAuth";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
type initialState = {
  name: string;
  email: string;
  password: string;
};
const initialState: initialState = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Please provide all values");
    }
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      auth.currentUser &&
        (await updateProfile(auth.currentUser, {
          displayName: name,
        }));

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        timestamp: serverTimestamp(),
      });

      navigate("/");
    } catch (error: any) {
      toast.error(error.message.split("Firebase:")[1]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-gray-800 text-center mt-6 font-bold">
        Sign up
      </h1>
      <div className="flex-cc flex-wrap px-6 py-8 md:py-12 max-w-6xl mx-auto">
        <div className="w-[95%] md:w-[67%] lg:w-[50%] mb-8 md:mb-6">
          <AuthImage />
        </div>
        <div className="w-[95%] md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <AuthInput
              type="text"
              value={name}
              placeholder="Full name"
              handleChange={handleChange}
              name="name"
            />

            <AuthInput
              type="email"
              value={email}
              placeholder="Email Address"
              handleChange={handleChange}
              name="email"
            />
            <div className="relative mb-6">
              <AuthInput
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                value={password}
                placeholder="Password"
                handleChange={handleChange}
                name="password"
              />
            </div>
            <div className="flex-bc flex-wrap md:text-sm text-base gap-4">
              <p>
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <AuthButton text="Sign up" loading={loading} />
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

export default SignUp;
