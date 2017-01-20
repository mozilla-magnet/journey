import Home from '../../../js/scenes/Home';
import createStore from '../../../js/store';
import renderer from 'react-test-renderer';
import React from 'react';
import 'react-native';

jest.mock('../../../js/components/Header', () => 'Header');

it('renders correctly', () => {
  renderer.create(
    <Home store={createStore()}/>
  );
});
