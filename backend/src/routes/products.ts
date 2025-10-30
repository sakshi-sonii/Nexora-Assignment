import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController';

const router = express.Router();

// Route to fetch all products
router.get('/', getAllProducts);

// Route to fetch single product by id
router.get('/:id', getProductById);

export default router;