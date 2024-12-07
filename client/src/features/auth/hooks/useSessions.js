import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession, logout } from "../api/authApi";

export const useSession = () => {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery(["session"], getSession, {
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: logoutUser } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["session"]);
    },
  });

  return { session, isLoading, logoutUser };
};
