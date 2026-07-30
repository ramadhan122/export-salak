import express from "express";
import { createRFQ } from "../controllers/rfqController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createRFQ);

export default router;