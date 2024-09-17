import React, { useState } from 'react';
import { api } from '../services/api';

const Orders = () => {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');

  const handleCreateOrder = () => {
    api.createOrder({ userId: parseInt(userId), productId: parseInt(productId) }).then(() => {
      alert('Order created successfully!');
    }).catch(() => {
      alert('Error creating order.');
    });
  };

  return (
    <div>
      <h2>Create Order</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
};

export default Orders;
