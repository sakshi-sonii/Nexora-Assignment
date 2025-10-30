import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../services/api';
import sampleProducts from '../data/sampleProducts';
import useCart from '../hooks/useCart';

const Home: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                // If API returns empty or error, fall back to sampleProducts
                if (!data || (Array.isArray(data) && data.length === 0)) {
                    setProducts(sampleProducts);
                } else {
                    setProducts(data);
                }
            } catch (err) {
                console.warn('API fetch failed, using sample products', err);
                setProducts(sampleProducts);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleAddToCart = async (productId: string) => {
        try {
            // use cart hook; default quantity 1
            await addToCart(productId, 1);
            console.log('Added to cart:', productId);
        } catch (err) {
            console.error('Failed to add to cart', err);
        }
    };

    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to Our Store</h1>
                <p className="text-muted">Browse popular products and add them to your cart.</p>
            </div>

            {loading ? (
                <div>Loading products…</div>
            ) : (
                <ProductList products={products} onAddToCart={handleAddToCart} />
            )}

            {error && <p className="text-muted">{error}</p>}
        </div>
    );
};

export default Home;