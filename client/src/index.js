import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleware = createStore(Reducer, compose(applyMiddleware(promiseMiddleware, ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));