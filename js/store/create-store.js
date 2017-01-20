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

/**
 * Create a brand new store.
 *
 * This is helpful for unit-testing when we
 * don't want to carry state between tests.
 *
 * @return {ReduxStore}
 */
export default () => {
  return createStore(
    reducers,
    applyMiddleware.apply(null, middlewares)
  );
};
