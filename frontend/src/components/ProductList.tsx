import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: any[];
    onAddToCart?: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product._id || product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;