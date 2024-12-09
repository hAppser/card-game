import express from "express";
import {
  createMatch,
  handleAttack,
  getMatch,
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/create", createMatch);

router.post("/:matchId/attack", handleAttack);

router.get("/:matchId", getMatch);

export default router;
