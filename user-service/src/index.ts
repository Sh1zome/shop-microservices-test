import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

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

app.listen(3001, () => {
    console.log('User service running on port 3001');
});
