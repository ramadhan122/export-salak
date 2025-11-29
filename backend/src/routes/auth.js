// authJS 
import express from "express";
import { adminLogin,  adminRegister } from "../controllers/authController.js";
const router = express.Router();

// POST routes
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// GET route optional untuk testing via browser
router.get("/login", (req, res) => res.send("Login route is working"));
router.get("/register", (req, res) => res.send("Register route is working"));


export default router;