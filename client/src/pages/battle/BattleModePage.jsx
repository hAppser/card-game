/* eslint-disable react/prop-types */
import { Button } from "@/shared/ui/Button";

const BattleModeCard = ({
  cardClassName,
  titleClassName,
  buttonClassName,
  title,
  buttonLabel,
  description,
}) => {
  return (
    <div className={cardClassName}>
      <h2 className={titleClassName}>{title}</h2>
      <p className="text-gray-600 mb-4 h-32">{description}</p>
      <Button label={buttonLabel} className={buttonClassName} />
    </div>
  );
};

export const BattleModePage = () => {
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
        />

        <BattleModeCard
          cardClassName="bg-blue-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-blue-700 mb-3"
          title="1 vs 1"
          description="Battle with one Pokémon in your team using enhanced damage calculation for a more strategic challenge."
          buttonClassName="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          buttonLabel="Play Enhanced Damage"
        />

        <BattleModeCard
          cardClassName="bg-green-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-green-700 mb-3"
          title="3 vs 3"
          description="Battle with a team of three Pokémon using simple damage calculation."
          buttonClassName="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          buttonLabel="Play Simple Damage"
        />

        <BattleModeCard
          cardClassName="bg-green-100 shadow-md hover:shadow-lg rounded-lg p-5 transition duration-300"
          titleClassName="text-xl font-semibold text-green-700 mb-3"
          title="3 vs 3"
          description="Battle with a team of three Pokémon using enhanced damage
            calculation for a deeper tactical experience."
          buttonClassName="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          buttonLabel="Play Enhanced Damage"
        />
      </div>
    </div>
  );
};
