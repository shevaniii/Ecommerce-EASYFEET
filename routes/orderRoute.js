import express from 'express'
import { getOrders , createOrder } from '../controllers/orderController.js'
import { authenticateToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/' , authenticateToken , getOrders);
router.post('/create' , authenticateToken , createOrder);

export default router;
