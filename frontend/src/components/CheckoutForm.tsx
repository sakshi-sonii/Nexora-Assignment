import React, { useState } from 'react';

interface CheckoutFormProps {
    cartItems?: any[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems = [] }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send formData and cartItems to your backend API
        console.log('Form submitted:', formData, 'cartItems:', cartItems);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
                <label>Zip Code:</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default CheckoutForm;