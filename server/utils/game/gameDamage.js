export function calculateEnhancedDamage({
  level,
  power,
  attack,
  defense,
  attackerType,
  defenderType,
  isCritical,
}) {
  const randomFactor = Math.random();
  const criticalMultiplier = isCritical ? 1.5 : 1;

  const typeAdvantages = {
    normal: { weakTo: ["fighting"], strongAgainst: [] },
    fire: {
      weakTo: ["water", "rock", "ground"],
      strongAgainst: ["grass", "bug", "steel", "ice"],
    },
    water: {
      weakTo: ["electric", "grass"],
      strongAgainst: ["fire", "rock", "ground"],
    },
    grass: {
      weakTo: ["fire", "flying", "bug", "poison", "ice"],
      strongAgainst: ["water", "rock", "ground"],
    },
    electric: { weakTo: ["ground"], strongAgainst: ["water", "flying"] },
    ice: {
      weakTo: ["fire", "rock", "fighting", "steel"],
      strongAgainst: ["grass", "ground", "flying", "dragon"],
    },
    fighting: {
      weakTo: ["flying", "psychic", "fairy"],
      strongAgainst: ["normal", "rock", "steel", "ice", "dark"],
    },
    poison: {
      weakTo: ["ground", "psychic"],
      strongAgainst: ["grass", "fairy"],
    },
    ground: {
      weakTo: ["water", "grass", "ice"],
      strongAgainst: ["fire", "electric", "poison", "rock", "steel"],
    },
    flying: {
      weakTo: ["electric", "ice", "rock"],
      strongAgainst: ["grass", "fighting", "bug"],
    },
    psychic: {
      weakTo: ["bug", "ghost", "dark"],
      strongAgainst: ["fighting", "poison"],
    },
    bug: {
      weakTo: ["fire", "flying", "rock"],
      strongAgainst: ["grass", "psychic", "dark"],
    },
    rock: {
      weakTo: ["water", "grass", "fighting", "ground", "steel"],
      strongAgainst: ["fire", "flying", "bug", "ice"],
    },
    ghost: { weakTo: ["ghost", "dark"], strongAgainst: ["psychic", "ghost"] },
    dragon: { weakTo: ["ice", "dragon", "fairy"], strongAgainst: ["dragon"] },
    dark: {
      weakTo: ["fighting", "bug", "fairy"],
      strongAgainst: ["psychic", "ghost"],
    },
    steel: {
      weakTo: ["fire", "fighting", "ground"],
      strongAgainst: ["rock", "ice", "fairy"],
    },
    fairy: {
      weakTo: ["poison", "steel"],
      strongAgainst: ["fighting", "dragon", "dark"],
    },
  };

  const attackerAdvantages = typeAdvantages[attackerType] || {
    weakTo: [],
    strongAgainst: [],
  };
  let typeMultiplier = 1;

  if (attackerAdvantages.strongAgainst.includes(defenderType)) {
    typeMultiplier = 1.3;
  } else if (attackerAdvantages.weakTo.includes(defenderType)) {
    typeMultiplier = 0.7;
  }

  const damage =
    ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
    randomFactor *
    typeMultiplier *
    criticalMultiplier;

  return randomFactor === 0 ? 0 : Math.round(damage);
}

export function calculateSimpleDamage({
  level,
  power,
  attack,
  defense,
  randomFactor,
}) {
  const damage =
    ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
    randomFactor;
  return Math.round(damage);
}
