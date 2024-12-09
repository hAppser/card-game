import { useNavigate } from "react-router-dom";
import { useConnectMetaMask } from "@/features/auth/hooks/useMetaMaskAuth";
import { useGetUser } from "@/entities/user/hooks/user.hooks";

export const AuthPage = () => {
  const connectWithMetaMask = useConnectMetaMask();
  const { data: user, refetch, isLoading } = useGetUser();
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      await connectWithMetaMask.mutateAsync();
      await refetch();
      if (user) navigate("/home");
    } catch (error) {
      console.error("Authentication failed:", error.message);
      alert(
        "Failed to connect MetaMask. Make sure it's installed and try again."
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-6">Log in with MetaMask to proceed.</p>
          <button
            onClick={handleConnect}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login with MetaMask
          </button>
        </div>
      </div>
    </div>
  );
};
