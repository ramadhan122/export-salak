// src/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "*******",
  database: "*******",
  port: 5432
});

export default pool;
