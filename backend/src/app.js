// app mulai 
import express from "express";
import cors from "cors"; 
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import rfqRoutes from "./routes/rfq.js"; 
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/rfq", rfqRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Api running on port 5000"))