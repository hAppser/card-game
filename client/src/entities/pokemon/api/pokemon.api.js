import { apiClient } from "@/shared/api/apiClient";

export const fetchPokemonList = async (params) => {
  const { data } = await apiClient.get("/pokemons", { params });
  return data;
};
