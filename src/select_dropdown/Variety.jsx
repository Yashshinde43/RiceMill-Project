// Selectt.js
import React from "react";
import Select from "react-select";
const customStyles = {
  control: (base) => ({
    ...base,
    height: 35,
    minheight: 30,
    width: 250,
    minwidth: 180,
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
};

const Variety = ({ onSelectChange }) => {
  const varietyy = [
    { label: "Frrga", value: "Frrga" },
    { label: "Frrc", value: "Frrc" },
    { label: "Rrga", value: "Rrga" },
    { label: "Rrc", value: "Rrc" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="variety"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Variety
        </label>
      </div>
      <div className="mt-1 relative">
        <div className="relative inline-block text-left">
          <Select
            onChange={onSelectChange}
            name="variety"
            options={varietyy}
            placeholder="Select Variety"
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Variety;
