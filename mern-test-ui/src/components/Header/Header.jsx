import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import actionTypes from '../../actions/actionTypes';
import useLogIn from '../../hooks/useLogin';

import './Header.style.css';

const Header = () => {
  const dispatch = useDispatch();
  const {
    user,
    totalItems
  } = useSelector(state => state);
  const {
    logOut
  } = useLogIn();
  const location = useLocation();
  const [input, setInput] = useState('');

  const onChangeHandler = (onChange) => (e) => {
    onChange(e.target.value);
  }

  useEffect(() => {
    let timerId = null;

    timerId = setTimeout(() => {
      dispatch({
        type: actionTypes.FILTER_PRODUCTS,
        payload: input,
      })
    }, 800);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [input]);

  useEffect(() => {
    if (location.pathname === '/Login') {
      logOut();
      dispatch({
        type: actionTypes.LOG_OUT,
      });
    }
  }, [location.pathname]);

  const showFilter = location.pathname === '/' && user;
  const isLogged = !!user;
  const homeRoute = !isLogged ? location.pathname : '/';

  return (
    <div className="Header">
      <div className='Container'>
        <div className='Container '>
          <h1 className="Header-title">
            <Link to={homeRoute}>
              Store
            </Link>
          </h1>
          {
            isLogged && (<h1 className="Header-title Orders vertical-bar">
              <Link to={'/orders'}>
                Orders
              </Link>
            </h1>)
          }

        </div>
        <div className="Header-checkout">
          {!isLogged && (
            <Link to="/Register">
              Sign up
            </Link>
          )}
          <Link to="/Login">
            {isLogged ? "Sign out" : "Sign in"}
          </Link>
          {isLogged && (
            <div className='Container'>
              <Link to="/checkout">
                <i className="fas fa-shopping-basket" />
              </Link>
              {totalItems > 0 &&
                <div className="Header-alert">{totalItems}</div>
              }
            </div>
          )}
        </div>
      </div>
      {showFilter && (
        <div className='Filter-section'>
          <span>Filter</span>
          <input type="text" placeholder="Search..." className='Input' onChange={onChangeHandler(setInput)} value={input} />
        </div>
      )
      }
    </div>
  )
};

export default Header;
