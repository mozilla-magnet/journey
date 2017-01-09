import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';

const middlewares = [];

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
