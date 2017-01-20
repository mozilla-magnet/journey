import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore  from './store';
import App from './App';

/**
 * Create the global app redux store.
 *
 * This store is a singleton that lasts
 * for the lifetime of the app.
 *
 * @type {ReduxStore}
 */
const store = createStore();

/**
 * The (data) Provider 'container' view.
 *
 * This view has no visual-state. It's one
 * job is to 'provide' the redux store
 * to the child `<App/>`.
 *
 * You can find out more about the Provider
 * by reading the react-redux docs.
 *
 * @type {ReactComponent}
 */
export default class AppProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}
