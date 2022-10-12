import React from "react";
import CreateListingButtonOption from "../components/CreateListingButtonOption";
import CreateListingButtonOptionBoolean from "../components/CreateListingButtonOptionBoolean";
import CreateListingNumberOption from "../components/CreateListingNumberOption";

const initialState = {
  type: "sell",
  name: "",
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: true,
  address: "",
  description: "",
  offer: true,
  regularPrice: 0,
  discountedPrice: 0,
};
const CreateListing = () => {
  const [formData, setFormData] = React.useState(initialState);
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
  } = formData;

  const handleChange = () => {};

  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-3xl text-gray-800 text-center my-6 font-bold">
        Create a Listing
      </h1>
      <form className="mt-10">
        {/* Rent / Sell */}
        <p className="create-listing-title">Sell / Rent</p>
        <div className="flex-cc gap-5">
          <CreateListingButtonOption
            handleClick={() =>
              setFormData((prev) => ({ ...prev, type: "sell" }))
            }
            type={type}
            text="sell"
          />
          <CreateListingButtonOption
            handleClick={() =>
              setFormData((prev) => ({ ...prev, type: "rent" }))
            }
            type={type}
            text="rent"
          />
        </div>
        {/* Name */}
        <p className="create-listing-title">Name</p>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Property Name"
          maxLength={32}
          minLength={10}
          required
          className="w-full py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
        />

        {/* Beds / Baths */}
        <div className="mt-6 flex-bc gap-10">
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">Beds</p>
            <CreateListingNumberOption
              name="bedrooms"
              value={bedrooms}
              handleChange={handleChange}
              min={1}
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">Baths</p>
            <CreateListingNumberOption
              name="bathrooms"
              value={bathrooms}
              handleChange={handleChange}
              min={1}
            />
          </div>
        </div>

        {/*  Furnished */}

        <p className="create-listing-title">Furnished</p>
        <div className="flex-cc gap-5">
          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, furnished: true }))
            }
            type={furnished}
            text="Yes"
          />

          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, furnished: false }))
            }
            type={!furnished}
            text="No"
          />
        </div>

        {/* parking spots */}

        <p className="create-listing-title">Parking spot</p>
        <div className="flex-cc gap-5">
          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, parking: true }))
            }
            type={parking}
            text="Yes"
          />
          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, parking: false }))
            }
            type={!parking}
            text="No"
          />
        </div>

        {/* Address */}
        <p className="create-listing-title">Address</p>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="resize-none w-full py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
        />

        {/* Description */}
        <p className="create-listing-title">Description</p>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="description"
          required
          className="resize-none w-full py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
        />

        {/*  Offer */}

        <p className="create-listing-title">Offer</p>
        <div className="flex-cc gap-5">
          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, offer: true }))
            }
            type={offer}
            text="Yes"
          />

          <CreateListingButtonOptionBoolean
            handleClick={() =>
              setFormData((prev) => ({ ...prev, offer: false }))
            }
            type={!offer}
            text="No"
          />
        </div>

        {/* Regular Price */}
        <div>
          <p className="create-listing-title">Regular Price</p>
          <div className="w-full flex gap-5 items-center">
            <CreateListingNumberOption
              name="regularPrice"
              value={regularPrice}
              handleChange={handleChange}
              min={50}
              max={20000000}
            />
            {type === "rent" && <p className="text-md w-full">$ / Month</p>}
          </div>
        </div>

        {offer && (
          <>
            {/* Discount */}
            <div>
              <p className="create-listing-title">Discounted Price</p>
              <div className="w-full flex gap-5 items-center">
                <CreateListingNumberOption
                  name="discountedPrice"
                  value={discountedPrice}
                  handleChange={handleChange}
                  min={10}
                  max={20000000}
                  required={offer}
                />

                {type === "rent" && <p className="text-md w-full">$ / Month</p>}
              </div>
            </div>
          </>
        )}

        <div className="mb-6">
          <p className="create-listing-title">Images</p>
          <p className="text-gray-600 text-sm">
            <span className="text-red-600">Note: </span> The first image will be
            the cover. (max: 6)
          </p>

          <input
            type="file"
            name="images"
            onChange={handleChange}
            accept=".jpg, .png, .jpeg"
            multiple
            required
            className="w-full py-2 text-gray-600 bg-white border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="mb-4 w-full h-10 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 transition-def"
        >
          {" "}
          Create Listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
