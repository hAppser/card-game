import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon.api";

export const usePokemons = (filters, page, limit) => {
  return useQuery({
    queryKey: ["pokemonList", { filters, page, limit }],
    queryFn: () => fetchPokemonList({ ...filters, page, limit }),
    keepPreviousData: true,
  });
};
