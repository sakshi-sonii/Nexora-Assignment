import React from 'react';

interface CartItem {
    id?: string;
    _id?: string;
    productId?: string;
    name?: string;
    price?: number;
    quantity?: number;
}

interface CartProps {
    items: CartItem[];
    onRemove: (id: string) => void;
    onUpdateQuantity?: (id: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity }) => {
    if (!items || items.length === 0) {
        return (
            <div className="cart">
                <h2>Your Shopping Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            <ul>
                {items.map((item: any) => {
                    const id = item.id || item._id || item.productId;
                    return (
                        <li key={id}>
                            <div>
                                <h3>{item.name || 'Product'}</h3>
                                <p>Price: ${item.price}</p>
                                <input
                                    type="number"
                                    value={item.quantity || 1}
                                    onChange={(e) => onUpdateQuantity && onUpdateQuantity(id, Number(e.target.value))}
                                    min={1}
                                />
                                <button onClick={() => onRemove(id)}>Remove</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Cart;