import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { getCartItems } from '../services/api';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartItems();
                setCartItems(items.items || items);
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
                history.push('/cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Please add items to your cart before checking out.</p>
            ) : (
                <CheckoutForm cartItems={cartItems} />
            )}
        </div>
    );
};

export default CheckoutPage;