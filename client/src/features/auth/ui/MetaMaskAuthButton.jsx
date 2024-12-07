import { useMetaMaskAuth } from "../hooks/useMetaMaskAuth";

export const MetaMaskAuthButton = () => {
  const { connectMetaMask } = useMetaMaskAuth();

  const handleClick = async () => {
    try {
      await connectMetaMask();
      alert("Successfully authenticated!");
    } catch (error) {
      alert(error.message || "Authentication failed");
    }
  };

  return <button onClick={handleClick}>Login with MetaMask</button>;
};
