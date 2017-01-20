import createStore from '../../../js/store/create-store';
import Home from '../../../js/scenes/Home';
import renderer from 'react-test-renderer';
import React from 'react';
import 'react-native';

jest.mock('../../../js/components/Header', () => 'Header');

it('renders correctly', () => {
  renderer.create(
    <Home store={createStore()}/>
  );
});
