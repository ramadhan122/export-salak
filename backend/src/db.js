// src/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Nihon123",
  database: "export_salak",
  port: 5432
});

export default pool;
