import { Link } from "react-router-dom";
import { useDeletePreset, usePresets } from "../hooks/usePresets";

export const Presets = () => {
  const { data, isLoading } = usePresets();
  const deletePreset = useDeletePreset();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Presets</h1>
        <Link
          to="/presets/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create New Preset
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          No presets available. Create your first one!
        </p>
      ) : (
        <ul className="space-y-6">
          {data.map((preset) => (
            <li
              key={preset._id}
              className="bg-white border rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {preset.name}
                </h2>
                <button
                  onClick={() => deletePreset.mutate(preset._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {preset.pokemon.map((poke) => (
                  <div
                    key={poke.id}
                    className="bg-gray-100 border rounded-lg shadow-sm p-3 flex flex-col items-center"
                  >
                    <p className="font-semibold text-gray-700">{poke.name}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
