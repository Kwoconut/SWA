import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import App from './App';

import warningsReducer from './store/reducers/warningsReducer'

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
  warnings: warningsReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
      <App />
  </Provider>
)

ReactDOM.render(app,document.getElementById('root'));
