import express from 'express';
import { addItemToCart, removeItemFromCart, getCartItems } from '../controllers/cartController';

const router = express.Router();

// Route to add an item to the cart -> POST /api/cart
router.post('/', addItemToCart);

// Route to remove an item from the cart -> DELETE /api/cart/:itemId
router.delete('/:itemId', removeItemFromCart);

// Route to get all items in the cart -> GET /api/cart
router.get('/', getCartItems);

export default router;