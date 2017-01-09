import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

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
