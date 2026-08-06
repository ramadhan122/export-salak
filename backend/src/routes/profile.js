import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Ambil profil user yang sedang login
router.get("/", authMiddleware, getProfile);

// Update profil user
router.put("/", authMiddleware, updateProfile);

export default router;