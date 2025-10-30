import React from 'react';

interface ProductCardProps {
    product: {
        id?: string;
        _id?: string;
        name: string;
        price: number;
        imageUrl?: string;
        description?: string;
    };
    onAddToCart?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const id = product.id || product._id || '';

    return (
        <div className="product-card">
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            <h3>{product.name}</h3>
            {product.description && <p>{product.description}</p>}
            <p>${(product.price || 0).toFixed(2)}</p>
            <button onClick={() => onAddToCart && onAddToCart(id)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;