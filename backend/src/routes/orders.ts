import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController';

const router = express.Router();

// POST /api/checkout - Create a new order
router.post('/', createOrder);

// GET /api/checkout/:id - Retrieve an order by ID
router.get('/:id', getOrderById);

export default router;