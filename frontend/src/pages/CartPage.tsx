import React from 'react';
import { useCart } from '../hooks/useCart';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const handleRemove = (itemId: string) => {
        removeFromCart(itemId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <div>
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <Cart items={cartItems} onRemove={handleRemove} />
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
};

export default CartPage;