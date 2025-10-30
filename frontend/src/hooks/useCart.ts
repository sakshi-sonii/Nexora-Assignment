import { useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, fetchCart } from '../services/api';

export const useCart = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const loadCart = async () => {
        try {
            setLoading(true);
            const cartData = await fetchCart();
            // cartData may be { items: [], totalPrice: 0 } or array
            setCartItems(cartData?.items || cartData || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const add = async (productId: string, quantity = 1, userId?: string) => {
        try {
            await apiAddToCart({ userId, productId, quantity });
            await loadCart();
        } catch (err) {
            setError(err);
        }
    };

    const remove = async (productId: string, userId?: string) => {
        try {
            await apiRemoveFromCart(productId, userId);
            await loadCart();
        } catch (err) {
            setError(err);
        }
    };

    const updateQuantity = async (productId: string, quantity: number, userId?: string) => {
        // simplistic: remove and re-add or adjust server-side implementation;
        // here we call add endpoint (server upsert may handle quantity).
        try {
            await apiAddToCart({ userId, productId, quantity });
            await loadCart();
        } catch (err) {
            setError(err);
        }
    };

    const clearCart = async (userId?: string) => {
        // no dedicated endpoint in this mock; clear locally or call backend if implemented.
        setCartItems([]);
    };

    return {
        cartItems,
        loading,
        error,
        addToCart: add,
        removeFromCart: remove,
        updateQuantity,
        clearCart,
    };
};

export default useCart;