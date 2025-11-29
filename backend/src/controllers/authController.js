// authController mulai 
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export async function adminRegister(req, res) {
    try {
        const {username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "username & password required "});

        const hashed = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users(username, password_hash, role) VALUES ($1, $2, $3)", [username, hashed, 'admin']);
        res.json({ success: true});
    } catch (err) {
        console.log("AUTH REGISTER ERR:", err);
        res.status(500).json({ error: err.message || "server error"});
    }
}

export async function adminLogin(req, res) {
    try {
        const { username, password } = req.body;
        const { rows } = await pool.query("SELECT * FROM users WHERE username=$1 LIMIT 1", [username]);
        const user = rows[0];
        if (!user) return res.status(401).json({ error: "invalid credentials "});

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(401).json({ error: "invalid credentials "});

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN });
        res.json({ token, user:{ id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.log("AUTH LOGIN ERR:", err);
        res.status(500).json({ error: err.message || "server error "});
    }
}