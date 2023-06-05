import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Layout.style.css';

const Layout = ({ children }) => (
  <div className="Main">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
