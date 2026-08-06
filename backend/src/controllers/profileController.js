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

    const { rows } = await pool.query(
      `UPDATE users
       SET
         full_name = $1,
         email = $2,
         phone = $3,
         country = $4,
         address = $5
       WHERE id = $6
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