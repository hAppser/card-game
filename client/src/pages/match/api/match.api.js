import { apiClient } from "@/shared/api/apiClient";

export const createMatch = async ({ mode, pokemon }) => {
  const response = await apiClient.post("/matches/create", { mode, pokemon });
  return response.data;
};

export const getMatch = async (matchId) => {
  const response = await apiClient.get(`/matches/${matchId}`);
  return response.data;
};

export const handleAttack = async (matchId, turn) => {
  const response = await apiClient.post(`/matches/${matchId}/attack`, { turn });
  return response.data;
};
