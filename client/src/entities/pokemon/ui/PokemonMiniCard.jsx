export const PokemonMiniCard = ({ pokemon, onClick, className }) => {
  const { name, type, attack, defense, speed, hp, images } = pokemon;
  return (
    <div className={className} onClick={onClick}>
      <img
        src={images.thumbnail}
        alt={name}
        className="w-full h-40 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm mb-1">
        <span className="font-bold">Type:</span> {type.join(", ")}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Attack:</span> {attack}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Defense:</span> {defense}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Speed:</span> {speed}
      </p>
      <p className="text-sm mb-2">
        <span className="font-bold">HP:</span> {hp}
      </p>
    </div>
  );
};
