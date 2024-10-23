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

const Paddy = ({ value, onChange }) => {
  const Paddy = [
    { label: "Mota", value: "Mota" },
    { label: "Patla", value: "Patla" },
    { label: "Sarna", value: "Sarna" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="type_of_paddy"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Select Paddy
        </label>
      </div>
      <div className="mt-1 relative">
        <div className="relative inline-block text-left">
          <Select
            onChange={(selectedOption) =>
              onChange("type_of_paddy", selectedOption.value)
            }
            name="type_of_paddy"
            options={Paddy}
            placeholder="Select Paddy"
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Paddy;
