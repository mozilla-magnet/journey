import 'react-native';
import React from 'react';
import Item from '../../../js/scenes/Item';
import renderer from 'react-test-renderer';
import createStore from '../../../js/store/create-store';

jest.mock('../../../js/components/Header', () => 'Header');

it('renders correctly', () => {
  const tree = renderer.create(
    <Item store={createStore()}/>
  );
});
