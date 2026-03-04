import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";

connectDB();

const app = express();

/* =======================
   CORS CONFIGURATION
======================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://lyra-dusky.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);

/* =======================
   MIDDLEWARES
======================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =======================
   ROUTES
======================= */

app.get("/", (req, res) => {
  res.send("Server connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

/* =======================
   SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});