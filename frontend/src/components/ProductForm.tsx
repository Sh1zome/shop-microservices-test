import React, { useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

interface ProductFormProps {
    onAction: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAction }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

    const handleAddProduct = async () => {
        try {
            await axios.post('http://localhost:3004/products', { name, price });
            alert('Product added');
            onAction(); // Обновляем список
        } catch (error) {
            alert('Error adding product');
        }
    };

    const handleDeleteProduct = async () => {
        if (productIdToDelete !== null) {
            try {
                await axios.delete(`http://localhost:3004/products/${productIdToDelete}`);
                alert('Product deleted');
                onAction(); // Обновляем список
            } catch (error) {
                alert('Error deleting product');
            }
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddProduct}>Add Product</button>

            <h2>Delete Product</h2>
            <input type="number" placeholder="Product ID" value={productIdToDelete || ''} onChange={(e) => setProductIdToDelete(Number(e.target.value))} />
            <button onClick={handleDeleteProduct}>Delete Product</button>
        </div>
    );
};

export default ProductForm;
