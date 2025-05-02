import express from "express";

import {login , profile, signup } from  '../controllers/authController.js'
import { authenticateToken } from "../middlewares/authMiddleware.js";
   
const router = express.Router()

router.post('/login' , login )
router.post('/signup' , signup)

// protected routes
router.get('/profile', authenticateToken , profile)
 export default router
