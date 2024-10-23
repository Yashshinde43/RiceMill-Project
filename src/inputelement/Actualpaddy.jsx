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

const Actualpaddy = ({ value, onChange }) => {
  const ActualPaddy = [
    { label: "RBG", value: "RBG" },
    { label: "Sambha", value: "Sambha" },
    { label: "IR", value: "IR" },
    { label: "White Sarna", value: "White Sarna" },
    { label: "Sarna", value: "Sarna" },
    { label: "RB Gold", value: "RB Gold" },
    { label: "Mahamaya", value: "Mahamaya" },
    { label: "OM 3", value: "OM 3" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <label
          htmlFor="actual_paddy"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Select Actual Paddy
        </label>
      </div>
      <div className="mt-1 relative">
        <div className="relative inline-block text-left">
          <Select
            onChange={(selectedOption) =>
              onChange("actual_paddy", selectedOption.value)
            }
            name="actual_paddy"
            options={ActualPaddy}
            placeholder="Select Actual Paddy"
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Actualpaddy;
