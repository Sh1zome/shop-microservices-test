import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Получение продуктов
    api.getProducts().then((response) => setProducts(response.data));
  }, []);

  const handleAddProduct = () => {
    api.addProduct({ name, price: parseFloat(price) }).then((response) => {
      setProducts([...products, { id: response.data.productId, name, price: parseFloat(price) }]);
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;
