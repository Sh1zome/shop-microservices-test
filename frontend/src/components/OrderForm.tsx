import React, { useState } from 'react';
import axios from 'axios';
import OrderList from './OrderList';

interface OrderFormProps {
    onAction: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onAction }) => {
    const [userId, setUserId] = useState<number | string>('');
    const [productId, setProductId] = useState<number | string>('');
    const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null);

    const handleAddOrder = async () => {
        try {
            await axios.post('http://localhost:3004/orders', { user_id: userId, product_id: productId });
            alert('Order created');
            onAction(); // Обновляем список
        } catch (error) {
            alert('Error creating order');
        }
    };

    const handleDeleteOrder = async () => {
        if (orderIdToDelete !== null) {
            try {
                await axios.delete(`http://localhost:3004/orders/${orderIdToDelete}`);
                alert('Order deleted');
                onAction(); // Обновляем список
            } catch (error) {
                alert('Error deleting order');
            }
        }
    };

    return (
        <div>
            <h2>Create Order</h2>
            <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(Number(e.target.value))} />
            <input type="number" placeholder="Product ID" value={productId} onChange={(e) => setProductId(Number(e.target.value))} />
            <button onClick={handleAddOrder}>Create Order</button>

            <h2>Delete Order</h2>
            <input type="number" placeholder="Order ID" value={orderIdToDelete || ''} onChange={(e) => setOrderIdToDelete(Number(e.target.value))} />
            <button onClick={handleDeleteOrder}>Delete Order</button>
        </div>
    );
};

export default OrderForm;
