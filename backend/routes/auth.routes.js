import express from "express";
import { getMe, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;