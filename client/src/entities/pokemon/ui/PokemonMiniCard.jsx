import { PokemonStat } from "./PokemonStat";
export const PokemonMiniCard = ({ pokemon, onClick, className }) => {
  const { name, type, attack, defense, speed, hp, images } = pokemon;

  const stats = [
    { label: "Type", value: type.join(", ") },
    { label: "Attack", value: attack },
    { label: "Defense", value: defense },
    { label: "Speed", value: speed },
    { label: "HP", value: hp },
  ];

  return (
    <div className={className} onClick={onClick}>
      <img
        src={images.thumbnail}
        alt={name}
        className="w-full h-40 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      {stats.map((stat, idx) => (
        <PokemonStat key={idx} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};
