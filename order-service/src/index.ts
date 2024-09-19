import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const USER_SERVICE_URL = 'http://localhost:3001';
const PRODUCT_SERVICE_URL = 'http://localhost:3002';
const DB_SERVICE_URL = 'http://localhost:3004';

// Получить все заказы через DB Service
app.get('/orders', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/orders`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Создать новый заказ, если пользователь и продукт существуют
app.post('/orders', async (req: Request, res: Response) => {
    const { user_id, product_id } = req.body;
    
    try {
        // Проверка, существует ли пользователь
        const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${user_id}`);
        
        // Проверка, существует ли продукт
        const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/products/${product_id}`);
        
        if (userResponse.data && productResponse.data) {
            const response = await axios.post(`${DB_SERVICE_URL}/orders`, { user_id, product_id });
            res.status(201).json(response.data);
        } else {
            res.status(404).json({ message: 'User or product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating order or user/product does not exist', error });
    }
});

// Удалить заказ через DB Service
app.delete('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`${DB_SERVICE_URL}/orders/${id}`);
        if (response.status === 200) {
            res.status(200).json({ message: `Order with ID ${id} deleted` });
        } else {
            res.status(404).json({ message: `Order with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});

app.listen(3003, () => {
    console.log('Order service running on port 3003');
});
