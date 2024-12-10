import { POKEMON_TYPES } from "@/shared/lib/constants";
import { useState } from "react";
import { Dropdown } from "@/shared/ui/Dropdown";

export const PokemonFilters = ({ filters, setFilters }) => {
  const [selectedType, setSelectedType] = useState(filters?.type || "");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleResetFilter = () => {
    setSelectedType("");
    setFilters((prev) => ({ ...prev, type: "" }));
  };

  return (
    <div className="relative inline-block">
      <Dropdown
        options={POKEMON_TYPES}
        selectedValue={selectedType}
        onSelect={handleTypeSelect}
        placeholder="Select Type"
      />
      {selectedType && (
        <button
          onClick={handleResetFilter}
          className="ml-2 bg-red-100 px-3 py-1 border border-gray-400  rounded hover:bg-red-200 focus:outline-none"
        >
          Reset
        </button>
      )}
    </div>
  );
};
