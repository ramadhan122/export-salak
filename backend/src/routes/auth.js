// auth.js
import express from "express";
import { login, userRegister, adminRegister } from "../controllers/authController.js";

const router = express.Router();

// REGISTER USER BIASA
router.post("/register", userRegister);

// REGISTER ADMIN (opsional)
router.post("/admin/register", adminRegister);

// LOGIN (untuk semua user)
router.post("/login", login);

// testing routes
router.get("/login", (req, res) => res.send("Login route is working"));
router.get("/register", (req, res) => res.send("Register route is working"));

export default router;
