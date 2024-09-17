import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];

app.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

app.post('/products', (req: Request, res: Response) => {
    const newProduct = { id: products.length + 1, name: req.body.name };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.listen(3002, () => {
    console.log('Product service running on port 3002');
});
