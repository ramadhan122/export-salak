import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Missing token",
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        const { rows } = await pool.query(
            "SELECT session_token FROM users WHERE id = $1",
            [decoded.id]
        );

        if (!rows.length) {
            return res.status(401).json({
                error: "USER_NOT_FOUND",
            });
        }

        if (rows[0].session_token !== decoded.sessionToken) {
            return res.status(401).json({
                error: "SESSION_REPLACED",
            });
        }

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            error: "INVALID_TOKEN",
        });

    }

}