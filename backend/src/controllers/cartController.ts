import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
    try {
        const { userId = 'guest', productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json({ message: 'productId is required' });
        }

        // Find or create cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Ensure product exists (optional but helpful)
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update quantity if item exists, otherwise push new item
        const existingIndex = cart.items.findIndex(
            (it: any) => it.productId.toString() === productId.toString()
        );

        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ productId, quantity: Number(quantity) });
        }

        // Optionally recalc totalPrice (basic)
        cart.totalPrice = 0;
        for (const it of cart.items) {
            // try to get product price from DB if populated
            const prod = await Product.findById(it.productId);
            const price = prod ? Number(prod.price) : 0;
            cart.totalPrice += price * Number(it.quantity);
        }

        await cart.save();

        // populate product details for client convenience
        await cart.populate('items.productId');

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req: Request, res: Response) => {
    try {
        // support both DELETE /api/cart/:itemId and body payloads
        const paramItemId = req.params.itemId;
        const bodyProductId = req.body.productId;
        const productId = paramItemId || bodyProductId;
        const userId = req.body.userId || req.query.userId || 'guest';

        if (!productId) {
            return res.status(400).json({ message: 'productId/itemId is required to remove item' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }

        cart.items = cart.items.filter((it: any) => it.productId.toString() !== productId.toString());

        // Recalculate totalPrice
        cart.totalPrice = 0;
        for (const it of cart.items) {
            const prod = await Product.findById(it.productId);
            const price = prod ? Number(prod.price) : 0;
            cart.totalPrice += price * Number(it.quantity);
        }

        await cart.save();
        await cart.populate('items.productId');

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

// Get cart items
export const getCartItems = async (req: Request, res: Response) => {
    try {
        const userId = (req.query.userId as string) || (req.params as any).userId || 'guest';
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }

        await cart.populate('items.productId');

        // Normalize response so frontend gets { items: [...], totalPrice }
        res.status(200).json({
            items: cart.items.map((it: any) => {
                const prod = (it.productId as any) || {};
                return {
                    id: prod._id ? prod._id.toString() : (it.productId && it.productId.toString()),
                    productId: prod._id ? prod._id.toString() : (it.productId && it.productId.toString()),
                    name: prod.name || 'Product',
                    price: prod.price || 0,
                    quantity: it.quantity,
                    imageUrl: prod.imageUrl || '',
                };
            }),
            totalPrice: cart.totalPrice || 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items', error });
    }
};