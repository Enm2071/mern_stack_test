/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import reducer from '../reducers';

import initialState from '../initialState';

const store = createStore(reducer, initialState);
const history = createMemoryHistory();

const ProviderMock = props => (
  <Provider store={store}>
    <Router history={history}>
      {props.children}
    </Router>
  </Provider>
);

export default ProviderMock;
