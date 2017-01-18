import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../../js/App';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const store = createStore(() => {});
  const tree = renderer.create(
    <Provider store={store}>
      <App/>
    </Provider>
  );
});
