import express from "express";
import crypto from "crypto";

import pool from "../db.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { sendVerificationEmail } from "../utils/emailServices.js";

const router = express.Router();

router.post("/send", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT id, email, email_verified FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return res.status(400).json({
        message: "Email sudah terverifikasi",
      });
    }

    if (!user.email) {
      return res.status(400).json({
        message: "Email belum tersedia",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await pool.query(
      `
      UPDATE users
      SET verification_token = $1
      WHERE id = $2
      `,
      [token, userId]
    );

    await sendVerificationEmail(user.email, token);

    res.json({
      message: "Email verifikasi berhasil dikirim",
    });
  } catch (error) {
    console.error("SEND VERIFICATION ERROR:", error);

    res.status(500).json({
      message: "Gagal mengirim email verifikasi",
    });
  }
});

router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const result = await pool.query(
      `
      SELECT id
      FROM users
      WHERE verification_token = $1
      `,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Token verifikasi tidak valid atau sudah digunakan",
      });
    }

    const userId = result.rows[0].id;

    await pool.query(
      `
      UPDATE users
      SET
        email_verified = true,
        verification_token = NULL
      WHERE id = $1
      `,
      [userId]
    );

    res.json({
      message: "Email berhasil diverifikasi",
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    res.status(500).json({
      message: "Gagal memverifikasi email",
    });
  }
});

export default router;