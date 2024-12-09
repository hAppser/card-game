import { useState } from "react";
import { toast } from "react-toastify";
import { usePokemon } from "@/entities/pokemon/hooks/pokemon.hooks";
import { PokemonMiniCard } from "@/entities/pokemon/ui/PokemonMiniCard";
import { Button } from "@/shared/ui/Button";
import { PokemonFilters } from "@/features/pokemonFilters/ui/PokemonFilters";
import { Pagination } from "@/shared/ui/Pagination";
import { useCreatePreset } from "../hooks/usePresets";

export const PresetBuilder = () => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [presetName, setPresetName] = useState("");
  const [filters, setFilters] = useState({ type: "", attack: "", defense: "" });
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePokemon(filters, page, 8);
  const createPreset = useCreatePreset();

  const handleSelectPokemon = (pokemon) => {
    if (selectedPokemons.find((p) => p.id === pokemon.id)) {
      setSelectedPokemons((prev) => prev.filter((p) => p.id !== pokemon.id));
    } else {
      if (selectedPokemons.length >= 3) {
        toast.error("You can select up to 3 pokemons!");
        return;
      }
      setSelectedPokemons((prev) => [...prev, pokemon]);
    }
  };

  const handleCreatePreset = () => {
    if (!presetName) {
      toast.warn("Please provide a name for the preset.");
      return;
    }
    if (selectedPokemons.length === 0) {
      toast.warn("Please select at least one pokemon.");
      return;
    }
    if (selectedPokemons.length === 2) {
      toast.error(
        "You can't choose exactly 2 pokemons. Battles are for 1 or 3 pokemons."
      );
      return;
    }

    createPreset.mutateAsync({
      name: presetName,
      pokemon: selectedPokemons,
    });
    toast.success("Preset saved successfully!");
    setPresetName("");
    setSelectedPokemons([]);
  };

  const handlePresetNameChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      toast.warn("Preset name cannot exceed 30 characters.");
      return;
    }
    setPresetName(value);
  };

  if (isLoading) return <p>Loading Pokemons...</p>;

  return (
    <div className="p-4">
      <div className="flex flex-row items-center gap-5 mb-4">
        <h1 className="text-2xl font-bold">Create a Pokemon Preset</h1>

        <Button
          onClick={handleCreatePreset}
          className=" bg-green-500 text-white px-4 py-2 rounded"
          label="Save Preset"
        />
      </div>

      <input
        type="text"
        placeholder="Preset Name"
        value={presetName}
        onChange={handlePresetNameChange}
        maxLength={30}
        className="border px-3 py-2 rounded mb-4 w-full"
      />
      <div className="mb-6">
        <PokemonFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.pokemons.map((pokemon) => (
          <PokemonMiniCard
            key={pokemon.id}
            pokemon={pokemon}
            className={`border shadow-md rounded-lg p-2 text-center cursor-pointer transform transition-transform hover:scale-105 ${
              selectedPokemons.find((p) => p.id === pokemon.id)
                ? "bg-blue-500 text-white"
                : ""
            }`}
            onClick={() => handleSelectPokemon(pokemon)}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} maxPage={data.totalPages} />
    </div>
  );
};
