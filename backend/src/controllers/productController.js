// src/controllers/productController.js
import pool from "../db.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "uploads";

export async function getProducts(req, res) {
  try {
    const highlight = req.query.highlight === "1" || req.query.highlight === "true";
    if (highlight) {
      const { rows } = await pool.query("SELECT * FROM products WHERE is_highlight = true ORDER BY id DESC");
      return res.json(rows);
    }
    const { rows } = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.log("DB ERROR getProducts:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}

export async function getProductById(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id=$1 LIMIT 1", [req.params.id]);
    res.json(rows[0] || null);
  } catch (err) {
    console.log("DB ERROR getProductById:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}

export async function getProductsBySlug(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE slug=$1 LIMIT 1", [req.params.slug]);
    res.json(rows[0] || null);
  } catch (err) {
    console.log("DB ERROR getProductsBySlug:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}

export async function createProduct(req, res) {
  try {
    // multer will set req.file
    const { name, slug, price, stock, category_id, description, is_highlight } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO products (name, slug, price, stock, category_id, description, image, is_highlight)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name, slug, price || 0, stock || 0, category_id || null, description || null, image, is_highlight === "true" || is_highlight === "1"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log("DB ERROR createProduct:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}

export async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const { name, slug, price, stock, category_id, description, is_highlight } = req.body;
    // if uploaded new image, remove old
    let image = null;
    if (req.file) {
      image = req.file.filename;
      // get old image
      const old = await pool.query("SELECT image FROM products WHERE id=$1 LIMIT 1", [id]);
      if (old.rows[0] && old.rows[0].image) {
        const oldPath = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads", old.rows[0].image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    // update fields (only set image if provided)
    const query = `
      UPDATE products SET
        name = COALESCE(NULLIF($1, ''), name),
        slug = COALESCE(NULLIF($2, ''), slug),
        price = COALESCE($3, price),
        stock = COALESCE($4, stock),
        category_id = COALESCE($5, category_id),
        description = COALESCE($6, description),
        ${image ? "image = $9," : ""}
        is_highlight = $8
      WHERE id = $7
      RETURNING *;
    `;
    const params = [name, slug, price || null, stock || null, category_id || null, description || null, id, is_highlight === "true" || is_highlight === "1", image];

    // adapt params and query for image optionality:
    let finalQuery, finalParams;
    if (image) {
      finalQuery = `
        UPDATE products SET
          name = COALESCE(NULLIF($1, ''), name),
          slug = COALESCE(NULLIF($2, ''), slug),
          price = COALESCE($3, price),
          stock = COALESCE($4, stock),
          category_id = COALESCE($5, category_id),
          description = COALESCE($6, description),
          image = $9,
          is_highlight = $8
        WHERE id = $7
        RETURNING *;
      `;
      finalParams = [name, slug, price || null, stock || null, category_id || null, description || null, id, is_highlight === "true" || is_highlight === "1", image];
    } else {
      finalQuery = `
        UPDATE products SET
          name = COALESCE(NULLIF($1, ''), name),
          slug = COALESCE(NULLIF($2, ''), slug),
          price = COALESCE($3, price),
          stock = COALESCE($4, stock),
          category_id = COALESCE($5, category_id),
          description = COALESCE($6, description),
          is_highlight = $7
        WHERE id = $8
        RETURNING *;
      `;
      finalParams = [name, slug, price || null, stock || null, category_id || null, description || null, is_highlight === "true" || is_highlight === "1", id];
    }

    const result = await pool.query(finalQuery, finalParams);
    res.json(result.rows[0]);
  } catch (err) {
    console.log("DB ERROR updateProduct:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    // remove image from disk
    const old = await pool.query("SELECT image FROM products WHERE id=$1 LIMIT 1", [id]);
    if (old.rows[0] && old.rows[0].image) {
      const oldPath = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads", old.rows[0].image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.log("DB ERROR deleteProduct:", err);
    res.status(500).json({ error: err.message || "unknown error" });
  }
}
