import React from "react";

interface Props {
  handleClick: () => void;
  type: boolean;
  text: string;
}
const CreateListingButtonOptionBoolean: React.FC<Props> = ({
  type,
  text,
  handleClick,
}) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`bg-white py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg transition-def w-full  ${
        type && "bg-slate-600 text-white"
      }`}
    >
      {text}
    </button>
  );
};

export default CreateListingButtonOptionBoolean;
