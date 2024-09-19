# Shop Microservices Demo

## Overview

This project consists of four microservices and a React application. The microservices include:

- **DB Service**: Handles database operations and migrations.
- **User Service**: Manages user-related operations.
- **Product Service**: Manages product-related operations.
- **Order Service**: Manages order-related operations.

The React application interacts with these services to provide a unified front-end interface.

## Project Structure

```
/project-root
|
|-- /db-service
|   |-- /data
|   |   |-- mydb.sqlite
|   |-- /migrations
|   |-- /src
|   |   |-- index.ts
|   |-- knexfile.ts
|
|-- /user-service
|   |-- /src
|       |-- index.ts
|
|-- /product-service
|   |-- /src
|       |-- index.ts
|
|-- /order-service
|   |-- /src
|       |-- index.ts
|
|-- /frontend
    |-- /src
    |   |-- /components
    |   |-- /pages
    |   |-- App.tsx
    |-- package.json
```

## Setup and Installation

### 1. **Install Dependencies**

Navigate to each microservice and React project directory and install the dependencies.

#### For DB Service
```bash
cd db-service
npm install
```
#### For User Service
```bash
cd user-service
npm install
```
#### For Product Service
```bash
cd product-service
npm install
```
#### For Order Service
```bash
cd order-service
npm install
```
#### For React App
```bash
cd frontend
npm install
```

### 2. **Setup Database**

Make sure you have SQLite installed and set up properly. Migrations are located in `db-service/migrations`. To run migrations, navigate to the `db-service` directory and run:

```bash
cd db-service
npx knex migrate:latest
```

### 3. **Run Services**

Start each microservice in separate terminals or using a process manager like `pm2`.

#### For DB Service
```bash
cd db-service
npx ts-node src/index.ts
```
#### For User Service
```bash
cd user-service
npx ts-node src/index.ts
```
#### For Product Service
```bash
cd product-service
npx ts-node src/index.ts
```
#### For Order Service
```bash
cd order-service
npx ts-node src/index.ts
```

### 4. **Run React Application**

Navigate to the React application directory and start the development server.

```bash
cd react-app
npm run dev
```

## API Endpoints

### **DB Service**

- **GET /users**: List all users.
- **POST /register**: Register a new user.
- **DELETE /users/:id**: Delete a user by ID.
- **GET /products**: List all products.
- **POST /products**: Add a new product.
- **DELETE /products/:id**: Delete a product by ID.
- **GET /orders**: List all orders with user and product details.
- **POST /orders**: Create a new order.
- **DELETE /orders/:id**: Delete an order by ID.
- **DELETE /orders/user/:id**: Delete an orders by UserID.
- **DELETE /orders/product/:id**: Delete an orders by ProductID.

### **User Service**

- **GET /users**: List all users (shared with DB Service).

### **Product Service**

- **GET /products**: List all products (shared with DB Service).

### **Order Service**

- **GET /orders**: List all orders with user and product details (shared with DB Service).

## Testing Endpoints

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or `curl`. 

### Example `curl` Commands

#### Get all users
```bash
curl http://localhost:3001/users
```
#### Register a new user
```bash
curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "password": "securepassword"}'
```
#### Delete a user by ID
```bash
curl -X DELETE http://localhost:3001/users/1
```
#### Get all products
```bash
curl http://localhost:3002/products
```
#### Add a new product
```bash
curl -X POST http://localhost:3002/products -H "Content-Type: application/json" -d '{"name": "Product A", "price": 19.99}'
```
#### Delete a product by ID
```bash
curl -X DELETE http://localhost:3002/products/1
```
#### Get all orders
```bash
curl http://localhost:3003/orders
```
#### Create a new order
```bash
curl -X POST http://localhost:3003/orders -H "Content-Type: application/json" -d '{"user_id": 1, "product_id": 1}'
```
#### Delete an order by ID
```bash
curl -X DELETE http://localhost:3003/orders/1
```

## Notes

- Ensure that each service is running on the specified port.
- The React app should be running on `http://localhost:5173` by default.
- Adjust port numbers if you modify the configurations.

## Troubleshooting

- **CORS Issues**: Make sure that each service allows requests from the React app's domain (`http://localhost:5173`).
- **Database Issues**: Verify that migrations have been applied correctly and that the SQLite database is accessible.

For further assistance, check the respective service documentation or raise an issue in the project's issue tracker.
