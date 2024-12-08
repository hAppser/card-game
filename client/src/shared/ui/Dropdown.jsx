/* eslint-disable react/prop-types */
import { useState } from "react";

export const Dropdown = ({ options, selectedValue, onSelect, placeholder }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="relative inline-block">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer bg-blue-100 border border-gray-400 px-4 py-2 rounded-md w-40 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedValue || placeholder}
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                setDropdownOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
                selectedValue === option ? "bg-blue-200" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
