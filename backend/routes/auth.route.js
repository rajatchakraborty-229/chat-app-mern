import express from "express";
const router = express.Router();
import { sign, login, logout } from "../controllers/auth.controller.js";

router.post("/signup", sign);
router.post("/login", login);
router.post("/logout", logout);

export default router;
