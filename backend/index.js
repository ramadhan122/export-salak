import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./src/routes/products.js";
import authRouter from "./src/routes/auth.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded images statically
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads")));

// routes
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => res.send("Export Salak API berjalan..."));

app.listen(5000, () => console.log("Server berjalan di http://localhost:5000"));
