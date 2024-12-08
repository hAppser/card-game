import { useDeletePreset, usePresets } from "../hooks/usePresets";

export const Presets = () => {
  const { data, isLoading } = usePresets();
  console.log(data);
  const deletePreset = useDeletePreset();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Presets</h1>
      <ul>
        {data.map((preset) => (
          <li key={preset._id} className="mb-6">
            <h2 className="font-semibold text-lg">{preset.name}</h2>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {preset.pokemon.map((poke) => (
                <div
                  key={poke.id}
                  className="border p-2 rounded-lg text-center bg-gray-100"
                >
                  <p className="font-semibold">{poke.name}</p>
                  <p>Level: {poke.level}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => deletePreset.mutate(preset._id)}
              className="mt-2 text-red-500"
            >
              Delete Preset
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
