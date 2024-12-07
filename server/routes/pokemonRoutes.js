import { Router } from "express";
import { getPokemonList } from "../controllers/pokemonController.js";

const router = Router();

router.get("/", getPokemonList);

export default router;
