import { useEffect, useState } from "react";
import { usePokemon } from "@/entities/pokemon/hooks/pokemon.hooks";
import { PokemonCard } from "@/entities/pokemon/ui/PokemonCard";
import { PokemonFilters } from "@/features/pokemonFilters/ui/PokemonFilters";
import { Pagination } from "@/shared/ui/Pagination";

export const PokemonPage = () => {
  const [filters, setFilters] = useState({ type: "", attack: "", defense: "" });
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePokemon(filters, page, 8);
  useEffect(() => {
    setPage(1);
  }, [filters]);
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-lg text-red-500">Error loading pokemons</p>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <PokemonFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} maxPage={data.totalPages} />
    </div>
  );
};
