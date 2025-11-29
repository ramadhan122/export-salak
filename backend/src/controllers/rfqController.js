import pool from "../db.js";

export async function createRFQ(req, res) {
  const { full_name, email, country, whatsapp, message, items } = req.body;

  try {
    const rfq = await pool.query(
      `INSERT INTO rfq (full_name,email,country,whatsapp,message)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [full_name, email, country, whatsapp, message]
    );

    for (const item of items) {
      await pool.query(
        `INSERT INTO rfq_items (rfq_id, product_id, quantity_kg) VALUES ($1,$2,$3)`,
        [rfq.rows[0].id, item.product_id, item.quantity_kg]
      );
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
