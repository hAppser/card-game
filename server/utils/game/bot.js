import Pokemon from "../../models/Pokemon.js";

export async function generateBotPokemon(playerPokemonType) {
  const allPokemon = await Pokemon.find({});
  const filteredPokemon = allPokemon.filter(
    (p) => !p.type.some((type) => playerPokemonType.includes(type))
  );
  const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
  const selectedPokemon = filteredPokemon[randomIndex];
  return {
    name: selectedPokemon.name,
    type: selectedPokemon.type,
    hp: selectedPokemon.hp,
    attack: selectedPokemon.attack,
    defense: selectedPokemon.defense,
    speed: selectedPokemon.speed,
    images: selectedPokemon.images,
  };
}
