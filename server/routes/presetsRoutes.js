import { Router } from "express";
import {
  getPresetsForUser,
  createPreset,
  deletePreset,
} from "../controllers/presetsController.js";

const router = Router();

router.get("/", getPresetsForUser);
router.post("/", createPreset);
router.delete("/:id", deletePreset);

export default router;
