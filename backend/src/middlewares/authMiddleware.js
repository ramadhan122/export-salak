// middlewares 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default function authMiddleware(req, res, next) {
    const authheader = req.header.authorization;
    if (!authheader) return res.status(401).json({ error: "missing token" });

    const parts = authheader.split(" ");
    if (parts.length !== 2) return res.status(401).json({ error: "invalid token" });

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({ error: "invalid token" });
    }
}