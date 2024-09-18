import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
    id: number;
    user_name: string;
    product_name: string;
    created_at: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3004/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Orders List</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>User:</strong> {order.user_name} <br />
                        <strong>Product:</strong> {order.product_name} <br />
                        <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
