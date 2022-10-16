import React from "react";
import { Link } from "react-router-dom";
import type { List } from "../types";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { auth } from "../firebase";

interface Props {
  id: string;
  listing: List;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}
const ListingItem: React.FC<Props> = ({
  listing,
  id,
  handleDelete,
  handleEdit,
}) => {
  const {
    name,
    address,
    offer,
    type,
    imagesURL,
    discountedPrice,
    regularPrice,
    bedrooms,
    bathrooms,
    timestamp,
    userRef,
  } = listing;
  const date = timestamp.toDate();

  const execPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      {listing && (
        <>
          <li className="relative bg-white flex flex-col justify-between items-start shadow-md hover:shadow-xl rounded-md overflow-hidden transition-def">
            <img
              loading="lazy"
              src={imagesURL[0]}
              alt={name}
              className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
            />
            <span className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
              {" "}
              {moment(date).startOf("hour").fromNow()}
            </span>
            <div className="w-full p-[10px]">
              <div className="flex items-center gap-1">
                <MdLocationOn className="h-4 w-4 text-green-500" />
                <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
                  {address}
                </p>
              </div>
              <Link to={`/category/${type}/${id}`}>
                <p className="font-semibold mt-1 text-xl text-[#457b9d]">
                  {name}
                </p>
              </Link>
              <p className="text-[#457b9d] mt-2 font-semibold">
                ${execPrice(offer ? discountedPrice : regularPrice)}
                {type === "rent" && " / month"}
              </p>
              <div className="flex items-center mt-[10px] gap-3">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-sm">
                    {bedrooms > 1 ? `${bedrooms} Beds` : "1 Bed"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <p className="font-bold text-sm">
                    {bathrooms > 1 ? `${bathrooms} Baths` : "1 Bath"}
                  </p>
                </div>
              </div>
            </div>
            {auth?.currentUser?.uid === userRef && (
              <>
                <FaTrash
                  onClick={() => handleDelete(id)}
                  className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
                />

                <MdEdit
                  onClick={() => handleEdit(id)}
                  className="absolute bottom-2 right-8 h-4 cursor-pointer text-blue-500"
                />
              </>
            )}
          </li>
        </>
      )}
    </>
  );
};

export default ListingItem;
