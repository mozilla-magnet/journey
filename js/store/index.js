/* global global */
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middlewares = [
  thunk,
];

if (global.__DEV__) {
  middlewares.push(createLogger({
    collapsed: true,
    diff: true,
  }));
}

export default createStore(
  reducers,
  applyMiddleware.apply(null, middlewares)
);
