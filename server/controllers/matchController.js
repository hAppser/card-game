import Match from "../models/Match.js";
import { generateBotPokemon } from "../utils/game/bot.js";
import {
  calculateEnhancedDamage,
  calculateSimpleDamage,
} from "../utils/game/gameDamage.js";
import { determineFirstTurn } from "../utils/game/matchLogic.js";

export async function createMatch(req, res) {
  try {
    const { pokemon: pokemons, mode, damageType } = req.body;
    const userId = req.session.user.id;
    const botPokemon = await Promise.all(
      pokemons
        .slice(0, mode)
        .map(async (pokemon) => generateBotPokemon(pokemon.type))
    );
    const matchData = {
      player: {
        userId,
        pokemon: pokemons.slice(0, mode),
      },
      bot: {
        pokemon: botPokemon.slice(0, mode),
      },
      turn: await determineFirstTurn(pokemons, botPokemon),
      status: "ongoing",
      damageType,
    };

    const match = new Match(matchData);
    await match.save();
    return res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleAttack(req, res) {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId);

    if (!match || match.status === "finished") {
      throw new Error("Match not found or already finished.");
    }

    const attacker =
      match.turn === "player" ? match.player.pokemon : match.bot.pokemon;
    const defender =
      match.turn === "player" ? match.bot.pokemon : match.player.pokemon;
    const activeDefenderIndex = defender.findIndex((p) => p.hp > 0);

    if (activeDefenderIndex === -1) {
      match.status = "finished";
      match.winner = match.turn;
      await match.save();
      return res.json({ winner: match.winner, match });
    }

    const damageCalculation =
      match.damageType === "simple"
        ? calculateSimpleDamage
        : calculateEnhancedDamage;

    const attackerIndex = attacker.findIndex((p) => p.hp > 0);

    const damage = damageCalculation({
      level: 15, // Basic constant
      power: attacker[attackerIndex].attack,
      attack: attacker[attackerIndex].attack,
      defense: defender[activeDefenderIndex].defense,
      attackerType: attacker[attackerIndex].type[0],
      defenderType: defender[activeDefenderIndex].type[0],
      randomFactor: Math.random(),
    });

    defender[activeDefenderIndex].hp -= damage;

    if (defender[activeDefenderIndex].hp <= 0) {
      const remainingDefenders = defender.filter((p) => p.hp > 0).length;
      if (remainingDefenders === 0) {
        match.status = "finished";
        match.winner = match.turn === "player" ? "player" : "bot";
      }
    }

    match.turn = match.turn === "player" ? "bot" : "player";
    await match.save();

    const result = {
      winner: match.winner || null,
      match,
      nextTurn: match.turn,
    };

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getMatch(req, res) {
  const { matchId } = req.params;
  const userId = req.session.user.id;

  try {
    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    if (match.player.userId.toString() !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
