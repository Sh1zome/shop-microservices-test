import express, { Request, Response } from 'express';
import axios from 'axios';
import amqp from 'amqplib';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Разрешаем запросы с вашего React-приложения

const USER_SERVICE_URL = 'http://localhost:3001';
const PRODUCT_SERVICE_URL = 'http://localhost:3002';
const DB_SERVICE_URL = 'http://localhost:3004';
const RABBITMQ_URL = 'amqp://localhost';
let channel: amqp.Channel;

// Настройка подключения к RabbitMQ
async function connectRabbitMQ() {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('user_events');
    await channel.assertQueue('product_events');

    // Подписка на очередь user_events
    channel.consume('user_events', async (msg) => {
        if (msg) {
            const event = JSON.parse(msg.content.toString());
            if (event.event === 'USER_DELETED') {
                const userId = event.data.id;
                console.log(`Received USER_DELETED event for user ID: ${userId}`);
                try {
                    // Удаляем все заказы, связанные с этим пользователем
                    const response = await axios.delete(`${DB_SERVICE_URL}/orders/user/${userId}`);
                    console.log(`All orders for user ${userId} deleted: `, response.data);
                } catch (error) {
                    console.error(`Failed to delete orders for user ${userId}: `, error);
                }
                try {
                    await axios.delete(`${DB_SERVICE_URL}/orders/user/${userId}`);
                    console.log(`Deleted orders for user ID: ${userId}`);
                } catch (error) {
                    console.error(`Error deleting orders for user ID: ${userId}`, error);
                }
            }
            channel.ack(msg);
        }
    });

    // Подписка на очередь product_events
    channel.consume('product_events', async (msg) => {
        if (msg) {
            const event = JSON.parse(msg.content.toString());
            if (event.event === 'PRODUCT_DELETED') {
                const productId = event.data.id;
                console.log(`Received PRODUCT_DELETED event for product ID: ${productId}`);
                try {
                    // Удаляем все заказы, связанные с этим продуктом
                    const response = await axios.delete(`${DB_SERVICE_URL}/orders/product/${productId}`);
                    console.log(`All orders for product ${productId} deleted: `, response.data);
                } catch (error) {
                    console.error(`Failed to delete orders for product ${productId}: `, error);
                }
                try {
                    await axios.delete(`${DB_SERVICE_URL}/orders/product/${productId}`);
                    console.log(`Deleted orders for product ID: ${productId}`);
                } catch (error) {
                    console.error(`Error deleting orders for product ID: ${productId}`, error);
                }
            }
            channel.ack(msg);
        }
    });
}

connectRabbitMQ().catch(console.error);

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
        
        if (userResponse.data != null && productResponse.data != null) {
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

// Удалить заказы по пользователю через DB Service
app.delete('/orders/user/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const response = await axios.delete(`${DB_SERVICE_URL}/orders/user/${userId}`);
        if (response.status === 200) {
            res.status(200).json({ message: `All orders for user ID ${userId} deleted` });
        } else {
            res.status(404).json({ message: `No orders found for user ID ${userId}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting orders for user', error });
    }
});

// Удалить заказы по продукту через DB Service
app.delete('/orders/product/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const response = await axios.delete(`${DB_SERVICE_URL}/orders/product/${productId}`);
        if (response.status === 200) {
            res.status(200).json({ message: `All orders for product ID ${productId} deleted` });
        } else {
            res.status(404).json({ message: `No orders found for product ID ${productId}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting orders for product', error });
    }
});

app.listen(3003, () => {
    console.log('Order service running on port 3003');
});
