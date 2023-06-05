import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  useSelector,
} from 'react-redux';
import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Layout from '../hoc/Layout';
import NotFound from '../containers/NotFound';
import Register from '../containers/Register';
import LogIn from '../containers/LogIn';
import Orders from '../containers/Orders';
import OrderDetails from '../containers/OrderDetails/OrderDetail';

const App = () => {
  const { user } = useSelector(state => state);
  if (user) {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    )
  }

   return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LogIn />} />
          <Route path='*' element={<LogIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )

};

export default App;
