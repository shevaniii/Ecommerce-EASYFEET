import express from "express";
import { login, profile, signup } from '../controllers/authController.js';
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User login
router.post('/login', login);

// User signup
router.post('/signup', signup);

// Get user profile (protected route)
router.get('/profile', authenticateToken, profile);

export default router;

 