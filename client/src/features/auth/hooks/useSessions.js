import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession, logout } from "../api/authApi";

export const useSession = () => {
  const { data: session, isLoading } = useQuery(["session"], getSession, {
    staleTime: 1000 * 60 * 5,
  });

  return { session, isLoading };
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["session"]);
    },
  });
};
