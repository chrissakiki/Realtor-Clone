import React from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

type initialState = {
  name: string;
  email: string;
};

const Profile = () => {
  const initialState: initialState = {
    name: auth.currentUser?.displayName ?? "",
    email: auth.currentUser?.email ?? "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(initialState);
  const [changeDetails, setChangeDetails] = React.useState(false);
  const { name, email } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (auth.currentUser && auth.currentUser?.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile has been updated successfully!");
    } catch (error: any) {
      toast.error(error.message.split("Firebase:")[1]);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <>
      <section className="max-w-6xl flex-cc flex-col mx-auto">
        <h1 className="text-3xl text-gray-800 text-center mt-6 font-bold">
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              disabled={!changeDetails}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition-def ${
                changeDetails && "bg-red-200 focus:bg-red-200"
              } `}
            />

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition-def"
            />

            <div className="flex-bc flex-wrap text-sm sm:text-lg mb-6">
              <p>
                Do you want to change your name?{" "}
                <span
                  onClick={() => setChangeDetails((prev) => !prev)}
                  className="text-red-600 hover:text-red-700 transition-def cursor-pointer"
                >
                  {changeDetails ? (
                    <span onClick={handleUpdate}> Apply Changes </span>
                  ) : (
                    <span> Edit </span>
                  )}
                </span>
              </p>
              <p
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-800 transition-def cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
