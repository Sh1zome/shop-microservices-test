import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ProductsPage: React.FC = () => {
    const [updateKey, setUpdateKey] = useState(0);

    const handleAction = () => {
        setUpdateKey(prev => prev + 1); // Обновляем ключ для перерисовки списка
    };

    return (
        <div>
            <h1>Products</h1>
            <ProductForm onAction={handleAction} />
            <ProductList key={updateKey} />
        </div>
    );
};

export default ProductsPage;
