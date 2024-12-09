export const MatchPokemonCard = ({ pokemon }) => {
  return (
    <div
      className={`flex flex-col items-center p-3 border rounded-lg shadow ${
        pokemon.hp > 0 ? "text-black" : "text-gray-400"
      }`}
    >
      <img
        src={pokemon.images.thumbnail}
        alt={pokemon.name}
        className="w-16 h-16 object-cover rounded-full mb-2"
      />
      <div className="text-sm font-medium text-center mb-2">{pokemon.name}</div>
      <div className="text-xs">Attack: {pokemon.attack}</div>
      <div className="text-xs">Defense: {pokemon.defense}</div>
      <div className="text-xs">Speed: {pokemon.speed}</div>
      <div className="text-xs">HP: {pokemon.hp}</div>
      <div className="text-xs">Type: {pokemon.type.join(" ")}</div>
    </div>
  );
};
