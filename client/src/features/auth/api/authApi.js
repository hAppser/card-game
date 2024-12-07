import { apiClient } from "@/shared/api/apiClient";

export const getSession = async () => {
  const response = await apiClient.get("/auth/session");
  return response.data;
};

export const requestNonce = async (address) => {
  const { data } = await apiClient.post("/auth/nonce", { address });
  return data;
};

export const verifySignature = async ({ address, signature }) => {
  const { data } = await apiClient.post("/auth/verify", {
    address,
    signature,
  });
  return data;
};

export const logout = async () => {
  await apiClient.post("/auth/logout");
};
