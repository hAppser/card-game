import { PokemonStat } from "./PokemonStat";

export const PokemonCard = ({ pokemon }) => {
  const { name, type, attack, defense, speed, hp, description, images } =
    pokemon;

  const stats = [
    { label: "Type", value: type.join(", ") },
    { label: "Attack", value: attack },
    { label: "Defense", value: defense },
    { label: "Speed", value: speed },
    { label: "HP", value: hp },
  ];

  return (
    <div className="border bg-white shadow-md rounded-lg p-4 max-w-xs mx-auto transform transition-transform hover:scale-105">
      <img
        src={images.thumbnail}
        alt={name}
        className="w-full h-40 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      {stats.map((stat, idx) => (
        <PokemonStat key={idx} label={stat.label} value={stat.value} />
      ))}
      <p className="text-sm text-gray-700">
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </p>
    </div>
  );
};
