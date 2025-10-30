import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

interface Props {
    product?: any;
}

const ProductDetail: React.FC<Props> = ({ product: initialProduct }) => {
    const { id } = useParams<{ id?: string }>();
    const [product, setProduct] = useState<any>(initialProduct || null);
    const [loading, setLoading] = useState<boolean>(!initialProduct);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialProduct) return;
        const fetchProduct = async () => {
            try {
                if (!id) {
                    setError('Invalid product id');
                    return;
                }
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id, initialProduct]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;