import { Router } from "express";
import {
  verifySignature,
  generateNonce,
  logout,
} from "../controllers/authController.js";

const router = Router();

router.post("/nonce", generateNonce);
router.post("/verify", verifySignature);
router.post("/logout", logout);
export default router;
