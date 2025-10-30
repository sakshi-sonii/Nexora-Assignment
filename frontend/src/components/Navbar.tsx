import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> | <Link to="/checkout">Checkout</Link>
        </nav>
    );
};

export default Navbar;
