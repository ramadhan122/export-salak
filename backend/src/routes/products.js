// src/routes/products.js
import express from "express";
import {
  getProducts,
  getProductById,
  getProductsBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { uploadSingle } from "../utils/multerConfig.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// public
router.get("/", getProducts);
router.get("/slug/:slug", getProductsBySlug);
router.get("/id/:id", getProductById);

// admin (protected)
router.post("/", uploadSingle, createProduct);
router.put("/:id", uploadSingle, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
