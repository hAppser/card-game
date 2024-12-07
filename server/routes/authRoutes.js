import { Router } from "express";
import {
  verifySignature,
  generateNonce,
} from "../controllers/authController.js";

const router = Router();

router.post("/nonce", generateNonce);
router.post("/verify", verifySignature);

export default router;
