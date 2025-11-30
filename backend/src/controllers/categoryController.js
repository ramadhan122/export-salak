import pool from "../db.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function addCategory(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nama kategori wajib diisi" });

    await pool.query("INSERT INTO categories(name) VALUES($1)", [name]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM categories WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
