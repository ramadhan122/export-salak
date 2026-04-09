import pool from "./src/db.js";
import bcrypt from "bcryptjs";

const username = "admin1";
const password = "admin123";

const passwordHash = await bcrypt.hash(password, 10);

// cek dulu
const check = await pool.query(
  "SELECT * FROM users WHERE username = $1",
  [username]
);

if (check.rows.length > 0) {
  console.log("❌ Admin sudah ada");
  process.exit(0);
}

await pool.query(
  "INSERT INTO users (username, password_hash, role) VALUES ($1,$2,$3)",
  [username, passwordHash, "admin"]
);

console.log("✅ Admin berhasil dibuat!");
process.exit(0);