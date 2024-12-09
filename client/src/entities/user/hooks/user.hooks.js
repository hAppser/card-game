import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { setUsername } from "../api/user.api";

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get("/user");
        return data.user;
      } catch (error) {
        if (error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

export const useHandleUsername = () =>
  useMutation({
    mutationFn: setUsername,
  });
