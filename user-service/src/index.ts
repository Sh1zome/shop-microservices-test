import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Разрешаем запросы с вашего React-приложения

const DB_SERVICE_URL = 'http://localhost:3004';

// Получить всех пользователей через DB Service
app.get('/users', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Получить одного пользователя через DB Service
app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/users/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching user ${id}`, error });
    }
});

// Зарегистрировать нового пользователя через DB Service
app.post('/users', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const response = await axios.post(`${DB_SERVICE_URL}/register`, { name, email, password });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Удалить пользователя через DB Service
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await axios.delete(`${DB_SERVICE_URL}/users/${id}`);
        res.status(200).json({ message: `User with ID ${id} deleted` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

app.listen(3001, () => {
    console.log('User service running on port 3001');
});
