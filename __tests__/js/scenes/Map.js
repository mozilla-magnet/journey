import 'react-native';
import React from 'react';
import { Map } from '../../../js/scenes/Map';

import renderer from 'react-test-renderer';

jest.mock('react-native-maps', () => 'MapView');
jest.mock('../../../js/components/Header', () => 'Header');

it('renders correctly', () => {
  const tree = renderer.create(
    <Map/>
  );
});
