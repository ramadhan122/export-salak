// multerconfig 
// src/utils/multerConfig.js
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "uploads";

// ensure folder exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

export const uploadSingle = multer({ storage }).single("image");
export const uploadMultiple = multer({ storage }).array("images", 8);
