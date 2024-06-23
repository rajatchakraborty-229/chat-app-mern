import express from "express";
const router = express.Router();
import { sign, login, logout } from "../controllers/auth.controller.js";

router.post("/sign", sign);
router.post("/login", login);
router.post("/logout", logout);

export default router;
