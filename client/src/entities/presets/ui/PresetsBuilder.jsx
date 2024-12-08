import { useState } from "react";
import { usePokemon } from "@/entities/pokemon/hooks/pokemon.hooks";
import { useCreatePreset } from "../hooks/usePresets";

export const PresetBuilder = () => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [presetName, setPresetName] = useState("");
  const { data, isLoading } = usePokemon({}, 1, 50);
  const createPreset = useCreatePreset();

  const handleSelectPokemon = (pokemon) => {
    if (selectedPokemons.find((p) => p.id === pokemon.id)) {
      setSelectedPokemons((prev) => prev.filter((p) => p.id !== pokemon.id));
    } else {
      if (selectedPokemons.length >= 3) {
        alert("You can select up to 3 pokemons!");
        return;
      }
      setSelectedPokemons((prev) => [...prev, pokemon]);
    }
  };

  const handleCreatePreset = () => {
    if (!presetName) {
      alert("Please provide a name for the preset.");
      return;
    }
    if (selectedPokemons.length === 0) {
      alert("Please select at least one pokemon.");
      return;
    }
    createPreset.mutateAsync({
      name: presetName,
      pokemon: selectedPokemons,
    });
    setPresetName("");
    setSelectedPokemons([]);
  };

  if (isLoading) return <p>Loading Pokemons...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Pokemon Preset</h1>
      <input
        type="text"
        placeholder="Preset Name"
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
        className="border px-3 py-2 rounded mb-4 w-full"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`border rounded-lg p-2 text-center cursor-pointer ${
              selectedPokemons.find((p) => p.id === pokemon.id)
                ? "bg-blue-500 text-white"
                : ""
            }`}
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <p className="font-semibold">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreatePreset}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Preset
      </button>
    </div>
  );
};
