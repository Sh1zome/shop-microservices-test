import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3004/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.id}: <strong>{product.name}</strong> - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
