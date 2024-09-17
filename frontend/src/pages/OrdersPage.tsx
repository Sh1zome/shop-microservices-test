import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';

const OrdersPage: React.FC = () => {
    const [updateKey, setUpdateKey] = useState(0);

    const handleAction = () => {
        setUpdateKey(prev => prev + 1); // Обновляем ключ для перерисовки списка
    };

    return (
        <div>
            <h1>Orders</h1>
            <OrderForm onAction={handleAction} />
            <OrderList key={updateKey} />
        </div>
    );
};

export default OrdersPage;
