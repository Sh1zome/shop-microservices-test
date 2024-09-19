import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Разрешаем запросы с вашего React-приложения

const DB_SERVICE_URL = 'http://localhost:3004';

// Получить все продукты через DB Service
app.get('/products', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Получить один продукт через DB Service
app.get('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/products/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: `Error fetching product ${id}`, error });
    }
});

// Добавить новый продукт
app.post('/products', async (req: Request, res: Response) => {
    const { name, price } = req.body;
    try {
        const response = await axios.post(`${DB_SERVICE_URL}/products`, { name, price });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

// Удалить продукт
app.delete('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await axios.delete(`${DB_SERVICE_URL}/products/${id}`);
        res.status(200).json({ message: `Product with ID ${id} deleted` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

app.listen(3002, () => {
    console.log('Product service running on port 3002');
});
