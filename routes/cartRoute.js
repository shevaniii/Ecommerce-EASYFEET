import express from 'express';
import { addToCart, removeFromCart, getCart, updateCartQuantity, clearCart } from '../controllers/cartController.js';
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get cart
router.get('/', authenticateToken, getCart);

// Add item to cart
router.post('/add', authenticateToken, addToCart);

// Update cart item quantity
router.put('/update/:productId', authenticateToken, updateCartQuantity);

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, removeFromCart);

// Clear entire cart
router.delete('/clear', authenticateToken, clearCart);

export default router;  
