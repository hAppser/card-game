import { useNavigate, useSearchParams } from "react-router-dom";
import { usePresetsByMode } from "@/entities/presets/hooks/usePresets";
import { Button } from "@/shared/ui/Button";

export const PresetSelectionPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = searchParams.get("mode");
  const damageType = searchParams.get("damageType");

  const { data: presets, isLoading } = usePresetsByMode(mode);

  const handleSelectPreset = (preset) => {
    navigate(`/battle/start?presetId=${preset._id}&damageType=${damageType}`);
  };

  const handleCreatePreset = () => {
    navigate("/presets/new");
  };

  if (isLoading) return <p>Loading presets...</p>;

  if (presets.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-6">
          No Presets Available for {mode} (
          {damageType[0].toUpperCase() + damageType.slice(1)} Damage)
        </h1>
        <p className="text-gray-600 mb-4">
          You need to create a preset to start battling.
        </p>
        <Button
          label="Create New Preset"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleCreatePreset}
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Select a Preset for {mode} (
        {damageType[0].toUpperCase() + damageType.slice(1)} Damage)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {presets.map((preset) => (
          <div
            key={preset._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2">{preset.name}</h2>
            <div className="grid grid-cols-3 gap-2">
              {preset.pokemon.map((poke) => (
                <div
                  key={poke.id}
                  className="text-center border rounded-md p-2 bg-gray-50"
                >
                  <p>{poke.name}</p>
                </div>
              ))}
            </div>
            <Button
              label="Select Preset"
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => handleSelectPreset(preset)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
