import React from "react";

interface Props {
  name: string;
  value: number;
  handleChange: () => void;
  min?: number;
  max?: number;
  required?: boolean;
}
const CreateListingNumberOption: React.FC<Props> = ({
  name,
  value,
  handleChange,
  min = 0,
  max = 10000,
  required = true,
}) => {
  return (
    <input
      type="number"
      name="bedrooms"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      required={required}
      className="w-full text-gray-700 text-xl bg-white border-gray-300 rounded"
    />
  );
};

export default CreateListingNumberOption;
