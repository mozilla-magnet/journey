import renderer from 'react-test-renderer';
import createStore from '../../js/store';
import { Provider } from 'react-redux';
import App from '../../js/App';
import React from 'react';
import 'react-native';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={createStore()}>
      <App/>
    </Provider>
  );
});
