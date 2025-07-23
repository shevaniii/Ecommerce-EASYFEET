import express from 'express';
import { getOrders, createOrder, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all orders
router.get('/', authenticateToken, getOrders);

// Create new order
router.post('/create', authenticateToken, createOrder);

// Get specific order by ID
router.get('/:orderId', authenticateToken, getOrderById);

// Update order status
router.put('/:orderId/status', authenticateToken, updateOrderStatus);

export default router;
