import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const UsersPage: React.FC = () => {
    const [updateKey, setUpdateKey] = useState(0);

    const handleAction = () => {
        setUpdateKey(prev => prev + 1); // Обновляем ключ для перерисовки списка
    };

    return (
        <div>
            <h1>Users</h1>
            <UserForm onAction={handleAction} />
            <UserList key={updateKey} />
        </div>
    );
};

export default UsersPage;
