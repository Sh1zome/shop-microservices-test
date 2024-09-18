import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3004/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.id}: <strong>{user.name}</strong> ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
