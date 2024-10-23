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

const Stacklocation = ({ value, onChange }) => {
  const Warehouse = [
    { label: "PRM In", value: "PRM In" },
    { label: "PRM Out", value: "PRM Out" },
    { label: "DRM IN", value: "DRM IN" },
    { label: "DRM OUT", value: "DRM OUT" },
    { label: "TRM IN", value: "TRM IN" },
    { label: "TRM OUT", value: "TRM OUT" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="stack_location"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Stack Location
        </label>
      </div>
      <div className="mt-1 relative">
        <div className="relative inline-block text-left">
          <Select
            onChange={(selectedOption) =>
              onChange("stack_location", selectedOption.value)
            }
            name="stack_location"
            className=""
            options={Warehouse}
            placeholder="Select location"
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Stacklocation;
