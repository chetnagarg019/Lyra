import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Server connected");
})

app.use('/api/auth',authRoutes);


// ..port or server slot 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
}); // 

