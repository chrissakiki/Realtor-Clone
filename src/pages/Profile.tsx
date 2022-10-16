import React from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "./ListingItem";
import type { List } from "../types";

type initialState = {
  name: string;
  email: string;
};

type Listing = {
  id: string;
  data: List;
};

const Profile = () => {
  const initialState: initialState = {
    name: auth.currentUser?.displayName ?? "",
    email: auth.currentUser?.email ?? "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(initialState);
  const [changeDetails, setChangeDetails] = React.useState(false);
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(true);
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

  const fetchLists = async () => {
    if (!auth.currentUser) return;
    try {
      const docRef = collection(db, "listings");
      const q = query(
        docRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let lists: Listing[] = [];
      querySnap.forEach((doc) => {
        return lists.push({
          id: doc.id,
          data: doc.data(),
        } as Listing);
      });
      setListings(lists);
    } catch (error) {
      toast.error("Couldn't fetch lists");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "listings", id));
      setListings(listings.filter((list) => list.id !== id));
      toast.success("Listings deleted successfully");
    } catch (error: any) {
      toast.error("Couldn't delete listing");
      console.log(error.message);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/profile/edit-listing/${id}`);
  };

  React.useEffect(() => {
    auth.currentUser?.uid && fetchLists();
  }, [auth.currentUser?.uid]);

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
          <Link to="/profile/create-listing">
            <button className="w-full bg-blue-600 rounded flex-cc gap-3 text-white h-11 uppercase text-base shadow-md font-medium hover:bg-blue-700 hover:shadow-lg transition-def">
              <FcHome className="text-2xl bg-red-200 rounded-full p-1" /> Sell
              or rent your home
            </button>
          </Link>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-10 mx-auto">
        {!loading && listings && listings.length > 0 ? (
          <>
            <h2 className="text-2xl text-center font-semibold">My Listings</h2>

            <ul className="sm:grid sm:grid-col-2 lg:grid-cols-3 xl:grid-col-4 2xl:grid-col-5 gap-6  my-6">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Profile;
