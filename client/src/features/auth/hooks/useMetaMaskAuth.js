import { useMutation } from "@tanstack/react-query";
import Web3 from "web3";
import { apiClient } from "@/shared/api/apiClient";

export const useConnectMetaMask = () =>
  useMutation({
    mutationFn: async () => {
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed");
      }

      const web3 = new Web3(window.ethereum);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];

      const {
        data: { nonce },
      } = await apiClient.post("/auth/nonce", { walletAddress });

      const signature = await web3.eth.personal.sign(
        `Nonce: ${nonce}`,
        walletAddress,
        ""
      );

      const { data } = await apiClient.post("/auth/verify", {
        walletAddress,
        signature,
      });
      return data.user;
    },
  });
