import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';

import './Products.style.css';
import actionTypes from '../../actions/actionTypes';
import httpClient from '../../api/http.client';


const Products = () => {
  const dispatch = useDispatch();
  const {
    filteredProducts
  } = useSelector(state => state);
  
  const handleAddToCart = product => () => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: product,
    });
  };

  const getProducts = async () => {
    try {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS,
      });
      const response = await httpClient.get('/products');
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: response.data.products,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="Products">
      <div className="Products-items">
        {filteredProducts.map(product => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
