import express from 'express'
import { getOrders , createOrder, getOrderById, updateOrderStatus } from '../controllers/orderController.js'
import { authenticateToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/' , authenticateToken , getOrders);
router.get('/:orderId' , authenticateToken , getOrderById);
router.post('/create' , authenticateToken , createOrder);
router.put('/:orderId/status' , authenticateToken , updateOrderStatus);

export default router;
