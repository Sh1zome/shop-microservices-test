import React from 'react';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

const App = () => {
  return (
    <div>
      <h1>Microservices Frontend</h1>
      <Users />
      <Products />
      <Orders />
    </div>
  );
};

export default App;
