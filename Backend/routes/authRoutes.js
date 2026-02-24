import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

router.post("/register",authController.registerUser) //done
router.post("/login",authController.loginUser) //done
router.post("/logout",authController.logoutUser) //




export default router;
