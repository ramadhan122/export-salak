import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const productsResult = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    res.json({
      totalProducts: Number(productsResult.rows[0].count),
      totalUsers: Number(usersResult.rows[0].count),
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      error: "Gagal mengambil data dashboard",
    });
  }
});

export default router;