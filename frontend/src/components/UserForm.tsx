import React, { useState } from 'react';
import axios from 'axios';
import UserList from './UserList';

interface UserFormProps {
    onAction: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onAction }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:3004/register', { name, email, password });
            alert('User added');
            onAction(); // Обновляем список
        } catch (error) {
            alert('Error adding user');
        }
    };

    const handleDeleteUser = async () => {
        if (userIdToDelete !== null) {
            try {
                await axios.delete(`http://localhost:3004/users/${userIdToDelete}`);
                alert('User deleted');
                onAction(); // Обновляем список
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAddUser}>Add User</button>

            <h2>Delete User</h2>
            <input type="number" placeholder="User ID" value={userIdToDelete || ''} onChange={(e) => setUserIdToDelete(Number(e.target.value))} />
            <button onClick={handleDeleteUser}>Delete User</button>
        </div>
    );
};

export default UserForm;
