// temp-admin 
import pool from "./src/db.js";
import bcrypt from "bcryptjs";

const password = "admin123"; // silakan ganti kalau mau
const passwordHash = await bcrypt.hash(password, 10);

await pool.query(
  "INSERT INTO users (username, password_hash, role) VALUES ($1,$2,$3)",
  ["admin", passwordHash, "admin"]
);

console.log("Admin berhasil dibuat!");
process.exit(0);
