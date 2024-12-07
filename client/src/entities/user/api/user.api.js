import { apiClient } from "@/shared/api/apiClient";

export const setUsername = async (username) => {
  const { data } = await apiClient.put("/user/username", { username });
  return data;
};
