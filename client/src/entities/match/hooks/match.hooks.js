import { useQuery, useMutation } from "@tanstack/react-query";
import { createMatch, handleAttack, getMatch } from "../api/match.api";
export const useCreateMatch = () => {
  return useMutation({
    mutationFn: createMatch,

    onError: (error) => {
      console.error("Error creating match:", error);
    },
  });
};

export const useGetMatch = (matchId) => {
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch(matchId),
    enabled: !!matchId,
  });
};

export const useHandleAttack = (matchId, turn) => {
  return useMutation({
    mutationFn: () => handleAttack(matchId, turn),
    onSuccess: (data) => {
      if (data.winner) {
        alert(`Winner: ${data.winner}`);
      }
    },
    onError: (error) => {
      console.error("Error handling attack:", error);
    },
  });
};
