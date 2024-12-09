export async function determineFirstTurn(playerPokemons, botPokemons) {
  const maxPlayerSpeed = Math.max(...playerPokemons.map((poke) => poke.speed));
  const maxBotSpeed = Math.max(...botPokemons.map((poke) => poke.speed));
  if (maxPlayerSpeed > maxBotSpeed) {
    return "player";
  } else if (maxBotSpeed > maxPlayerSpeed) {
    return "bot";
  }

  return Math.random() > 0.5 ? "player" : "bot";
}
