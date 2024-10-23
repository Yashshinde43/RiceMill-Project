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

const Ricemilldown = ({ value, onChange }) => {
  const Warehouse = [
    { label: "Purushotam Rice Mill", value: "PRM" },
    { label: "Dushyant Rice Mill", value: "DRM" },
    { label: "Tulsi Rice Mill", value: "TRM" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="hopper_rice_mill_id"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Hopper Location
        </label>
      </div>
      <div className="mt-1 relative">
        <div className="relative inline-block text-left">
          <Select
            onChange={(selectedOption) =>
              onChange("hopper_rice_mill_id", selectedOption.value)
            }
            name="hopper_rice_mill_id"
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

export default Ricemilldown;
