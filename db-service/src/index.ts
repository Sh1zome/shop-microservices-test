import express, { Request, Response } from 'express';
import { db } from './db';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

// Регистрация пользователя
app.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [userId] = await db('users').insert({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

// Получение всех пользователей
app.get('/users', async (req: Request, res: Response) => {
    const users = await db('users').select('id', 'name', 'email');
    res.json(users);
});

// Удаление пользователя
app.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await db('users').where({ id }).del();
        res.status(200).json({ message: `User with ID ${id} deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
});

// Добавление продукта
app.post('/products', async (req: Request, res: Response) => {
    const { name, price } = req.body;

    try {
        const [productId] = await db('products').insert({ name, price });
        res.status(201).json({ message: 'Product added', productId });
    } catch (error) {
        res.status(400).json({ message: 'Error adding product', error });
    }
});

// Получение всех продуктов
app.get('/products', async (req: Request, res: Response) => {
    const products = await db('products').select();
    res.json(products);
});

// Удаление продукта
app.delete('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await db('products').where({ id }).del();
        res.status(200).json({ message: `Product with ID ${id} deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error });
    }
});

// Добавление заказа
app.post('/orders', async (req: Request, res: Response) => {
    const { user_id, product_id } = req.body;

    try {
        const [orderId] = await db('orders').insert({ user_id, product_id });
        res.status(201).json({ message: 'Order created', orderId });
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error });
    }
});

// Получение всех заказов
app.get('/orders', async (req: Request, res: Response) => {
    const orders = await db('orders').select();
    res.json(orders);
});

// Удаление заказа
app.delete('/orders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await db('orders').where({ id }).del();
        res.status(200).json({ message: `Order with ID ${id} deleted` });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting order', error });
    }
});

// Запуск сервиса
app.listen(3004, () => {
    console.log('DB service running on port 3004');
});
