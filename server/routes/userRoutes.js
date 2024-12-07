import { Router } from "express";
import { getUser, updateUsername } from "../controllers/userController.js";

const router = Router();

router.get("", getUser);
router.put("/username", updateUsername);

export default router;
