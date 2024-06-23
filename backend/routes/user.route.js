import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUsersforSideBar } from "../controllers/user.controller.js";

const router =express.Router()

router.get("/",protectRoute, getUsersforSideBar)
export default router;