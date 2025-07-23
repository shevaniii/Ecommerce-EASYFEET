import express from 'express';
import { getProduct, getProductById, updateProduct, deleteProduct, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Get all products
router.get('/', getProduct);

// Create new product
router.post('/', createProduct);

// Get product by ID
router.get('/:id', getProductById);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

export default router;