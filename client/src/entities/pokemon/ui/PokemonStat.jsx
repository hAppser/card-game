export const PokemonStat = ({ label, value }) => (
  <p className="text-sm text-gray-600 mb-1">
    <span className="font-bold">{label}:</span> {value}
  </p>
);
