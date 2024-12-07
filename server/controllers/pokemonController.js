import Pokemon from "../models/Pokemon.js";

export async function getPokemonList(req, res) {
  try {
    const {
      type,
      minAttack,
      minDefense,
      minHp,
      speed,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    if (type) {
      filters.type = { $in: [type] };
    }

    if (minAttack) {
      filters.attack = { $gte: parseInt(minAttack) };
    }

    if (minDefense) {
      filters.defense = { $gte: parseInt(minDefense) };
    }

    if (minHp) {
      filters.hp = { $gte: parseInt(minHp) };
    }

    if (speed) {
      filters.speed = { $gte: parseInt(speed) };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const pokemons = await Pokemon.find(filters)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const totalCount = await Pokemon.countDocuments(filters);

    res.status(200).json({
      pokemons,
      totalPages: Math.ceil(totalCount / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
