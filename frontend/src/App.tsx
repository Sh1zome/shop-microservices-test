import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container">
                <nav>
                    <Link to="/users">Users</Link> |{' '}
                    <Link to="/products">Products</Link> |{' '}
                    <Link to="/orders">Orders</Link>
                </nav>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
