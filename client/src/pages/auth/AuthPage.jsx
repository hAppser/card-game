import { useState } from "react";
import { useConnectMetaMask } from "@/features/auth/hooks/useMetaMaskAuth";
import {
  useGetUser,
  useHandleUsername,
} from "../../entities/user/hooks/user.hooks";

export const AuthPage = () => {
  const [username, setUsername] = useState("");
  const connectWithMetaMask = useConnectMetaMask();
  const { data: user, refetch, isLoading } = useGetUser();
  const createUsername = useHandleUsername();
  const handleConnect = async () => {
    try {
      await connectWithMetaMask.mutateAsync();
      await refetch();
    } catch (error) {
      console.error("Authentication failed:", error.message);
      alert(
        "Failed to connect MetaMask. Make sure it's installed and try again."
      );
    }
  };

  const handleSetUsername = async () => {
    try {
      await createUsername.mutateAsync(username);
      await refetch();
    } catch (error) {
      console.error("Failed to set username:", error.message);
      alert("Could not set username. Please try again.");
    }
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {!user ? (
        <button onClick={handleConnect}>Login with MetaMask</button>
      ) : (
        <div>
          <p>Welcome, {user.username || "Champion"}!</p>
          {!user.username && (
            <div>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleSetUsername}>Set Username</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
