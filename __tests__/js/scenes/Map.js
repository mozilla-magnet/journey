import 'react-native';
import React from 'react';
import { Map } from '../../../js/scenes/Map';
import renderer from 'react-test-renderer';

// jest.mock('../../../js/components/MagnetMap', () => 'MagnetMap');
jest.mock('../../../js/components/Header', () => 'Header');

it('renders correctly', () => {
  const tree = renderer.create(
    <Map/>
  );
});
