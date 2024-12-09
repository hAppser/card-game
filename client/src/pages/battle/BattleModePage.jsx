import { useNavigate } from "react-router-dom";
import { BattleModeCard } from "./ui/BattleModeCard";

export const BattleModePage = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode, damageType) => {
    console.log(mode);
    navigate(`/preset-selection?mode=${mode}&damageType=${damageType}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Choose Your Battle Mode
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <BattleModeCard
          cardClassName="bg-blue-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-blue-700 mb-3"
          title="1 vs 1"
          description="Battle with one Pokémon in your team using simple damage calculation."
          buttonClassName="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          buttonLabel="Play Simple Damage"
          onButtonClick={() => handleModeSelection("1v1", "simple")}
        />

        <BattleModeCard
          cardClassName="bg-blue-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-blue-700 mb-3"
          title="1 vs 1"
          description="Battle with one Pokémon in your team using enhanced damage calculation for a more strategic challenge."
          buttonClassName="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          buttonLabel="Play Enhanced Damage"
          onButtonClick={() => handleModeSelection("1v1", "enhanced")}
        />

        <BattleModeCard
          cardClassName="bg-green-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-green-700 mb-3"
          title="3 vs 3"
          description="Battle with a team of three Pokémon using simple damage calculation."
          buttonClassName="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          buttonLabel="Play Simple Damage"
          onButtonClick={() => handleModeSelection("3v3", "simple")}
        />

        <BattleModeCard
          cardClassName="bg-green-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-green-700 mb-3"
          title="3 vs 3"
          description="Battle with a team of three Pokémon using enhanced damage calculation for a deeper tactical experience."
          buttonClassName="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          buttonLabel="Play Enhanced Damage"
          onButtonClick={() => handleModeSelection("3v3", "enhanced")}
        />
      </div>
    </div>
  );
};
