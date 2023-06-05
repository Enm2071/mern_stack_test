import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useNavigate,
} from 'react-router-dom';
import actionTypes from '../../actions/actionTypes';
import httpClient from '../../api/http.client';
import {
  calculateTotal,
} from '../../utils/currrency';

import './Checkout.style.css';

const Checkout = () => {
  const {
    cart,
    totalItems,
    loading,
  } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity);
    const sum = cart.reduce(reducer, 0);
    return sum.toFixed(2);
  };

  const remove = product => () => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: product,
    });
  };

  const createOrder = async () => {
    try {
      const items = cart.map(item => ({
        productId: item.id,
        amount: item.quantity,
      }));

      dispatch({
        type: actionTypes.ADD_ORDER
      });
      const response = await httpClient.post('/orders',
        JSON.stringify(items),
      );

      dispatch({
        type: actionTypes.ADD_ORDER_SUCCESS,
        payload: response,
      })

      navigate('/orders');
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_ORDER_FAILURE,
        payload: error.message,
      })
    }
  }

  const enableButton = totalItems > 0 && !loading;

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        {cart.length > 0 ? <h3>Product list:</h3> : <h2>No Products</h2>}
        <div>
          {cart.map(item => (
            <div className="Checkout-item" key={item.title}>
              <div className="Checkout-element">
                <h4>{item.title}</h4>
                <h4>{item.quantity}</h4>
                <span>
                  {calculateTotal(item.price, item.quantity)}
                </span>
              </div>
              <button
                type="button"
                onClick={remove(item)}
              >
                <i className="fas fa-trash-alt" />
              </button>
            </div>
          ))}
          {cart.length > 0 && (
            <div className="Checkout-sidebar">
              <h3>
                {`Precio Total: $ ${handleSumTotal()}`}
              </h3>
            </div>
          )}
        </div>
      </div>

      <div className="Checkout-actions">
        <button type="button" onClick={createOrder} disabled={!enableButton}>{loading ? "loading..." : "Create order"}</button>
      </div>
    </div>
  );
};

export default Checkout;
