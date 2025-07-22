import express from 'express'
import {addToCart , removeFromCart , getCart, updateCartQuantity, clearCart} from '../controllers/cartController.js'
import { authenticateToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/add' , authenticateToken, addToCart);
router.get('/' , authenticateToken , getCart);
router.put('/update/:productId' , authenticateToken , updateCartQuantity);
router.delete('/remove/:productId' , authenticateToken , removeFromCart);
router.delete('/clear' , authenticateToken , clearCart);

export default router;  
