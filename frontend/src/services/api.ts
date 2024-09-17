import axios from 'axios';

// Базовые URL для каждого сервиса
const userServiceUrl = 'http://localhost:3001';
const productServiceUrl = 'http://localhost:3002';
const orderServiceUrl = 'http://localhost:3003';

export const api = {
  // User Service
  getUsers: () => axios.get(`${userServiceUrl}/users`),
  registerUser: (data: { name: string; email: string; password: string }) =>
    axios.post(`${userServiceUrl}/users`, data),

  // Product Service
  getProducts: () => axios.get(`${productServiceUrl}/products`),
  addProduct: (data: { name: string; price: number }) =>
    axios.post(`${productServiceUrl}/products`, data),

  // Order Service
  createOrder: (data: { userId: number; productId: number }) =>
    axios.post(`${orderServiceUrl}/orders`, data),
};
