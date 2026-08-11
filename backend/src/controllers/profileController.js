import pool from "../db.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
          id,
          username,
          full_name,
          email,
          phone,
          country,
          address,
          avatar,
          role,
          email_verified
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      country,
      address,
    } = req.body;

    // Ambil email lama
    const currentUser = await pool.query(
      `SELECT email FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (!currentUser.rows.length) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const oldEmail = currentUser.rows[0].email;

    // Cek apakah email berubah
    const emailChanged = oldEmail !== email;

    const { rows } = await pool.query(
      `UPDATE users
       SET
         full_name = $1,
         email = $2,
         phone = $3,
         country = $4,
         address = $5,
         email_verified = CASE
           WHEN $6 = true THEN false
           ELSE email_verified
         END
       WHERE id = $7
       RETURNING
         id,
         full_name,
         email,
         phone,
         country,
         address,
         avatar,
         role,
         email_verified`,
      [
        full_name,
        email,
        phone,
        country,
        address,
        emailChanged,
        req.user.id,
      ]
    );

    res.json({
      message: "Profil berhasil diperbarui",
      user: rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};