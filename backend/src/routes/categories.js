import express from "express";
console.log("categories route loaded");
import { getCategories, addCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;
