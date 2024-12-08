import { useState } from "react";

import {
  useGetUser,
  useHandleUsername,
} from "@/entities/user/hooks/user.hooks";

export const HomePage = () => {
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const createUsername = useHandleUsername();
  const { data: user, refetch, isLoading } = useGetUser();

  const handleSetUsername = async () => {
    try {
      await createUsername.mutateAsync(username);
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to set username:", error.message);
      alert("Could not set username. Please try again.");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(true);
    setUsername(user.username || "");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4 text-gray-700 mt-10">
        Welcome,{" "}
        <span className="font-semibold">{user.username || "Champion"}</span>!
      </h1>
      {!user.username && (
        <>
          <div className="flex flex-col w-3/5 mx-auto sm:flex-row sm:items-center justify-center gap-2">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
            />
            <button
              onClick={handleSetUsername}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Set Username
            </button>
          </div>
        </>
      )}

      {user.username && (
        <>
          {!isEditing && (
            <button
              onClick={toggleEditMode}
              className=" bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Change Username
            </button>
          )}

          {isEditing && (
            <div className="flex flex-col w-3/5 mx-auto sm:flex-row sm:items-center justify-center gap-2 mt-4">
              <input
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSetUsername}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
