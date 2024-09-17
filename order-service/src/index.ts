import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

const app = express();
app.use(express.json());

const DB_SERVICE_URL = 'http://localhost:3004';

// Создать заказ
app.post('/orders', async (req: Request, res: Response) => {
    const { userId, productId } = req.body;

    try {
        // Проверка существования пользователя
        const userResponse = await axios.get(`${DB_SERVICE_URL}/users/${userId}`);
        if (!userResponse.data) {
            return res.status(400).json({ message: 'User ID not found' });
        }

        // Проверка существования продукта
        const productResponse = await axios.get(`${DB_SERVICE_URL}/products/${productId}`);
        if (!productResponse.data) {
            return res.status(400).json({ message: 'Product ID not found' });
        }

        // Создание заказа
        const newOrder = { id: new Date().getTime(), userId, productId }; // Пример создания заказа
        res.status(201).json(newOrder);
    } catch (error) {
        if (error instanceof AxiosError) {
            // Если это ошибка Axios
            return res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Unknown Axios error' });
        } else {
            // Любая другая ошибка
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

app.listen(3003, () => {
    console.log('Order service running on port 3003');
});
