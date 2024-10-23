// SelectInput.js
import React from "react";
import Select from "react-select";

const SelectInput = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  linkText,
  linkHref,
}) => {
  return (
    <div className="my-2.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1">
        <Select
          styles={{
            indicatorSeparator: () => ({
              display: "none",
            }),
            control: (base) => ({
              ...base,
              height: 35,
              minHeight: 35,
              width: "100%",
              minWidth: 250,
            }),
          }}
          placeholder={placeholder}
          name={name}
          options={options}
          value={value}
          onChange={onChange}
        />

        {linkText && linkHref && (
          <p className="mt-1.5 text-sm text-gray-500">
            {`Cannot Find ${label}? `}
            <a
              href={linkHref}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {linkText}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
