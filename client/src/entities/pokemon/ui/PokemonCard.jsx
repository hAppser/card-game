/* eslint-disable react/prop-types */
export const PokemonCard = ({ pokemon }) => {
  const { name, type, attack, defense, speed, hp, description, images } =
    pokemon;
  return (
    <div className="border bg-white shadow-md rounded-lg p-4 max-w-xs mx-auto transform transition-transform hover:scale-105">
      <img
        src={images.thumbnail}
        alt={name}
        className="w-full h-40 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-bold">Type:</span> {type.join(", ")}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-bold">Attack:</span> {attack}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-bold">Defense:</span> {defense}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-bold">Speed:</span> {speed}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-bold">HP:</span> {hp}
      </p>
      <p className="text-sm text-gray-700">
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </p>
    </div>
  );
};
