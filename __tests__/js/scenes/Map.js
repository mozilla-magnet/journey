import 'react-native';
import React from 'react';
import Map from '../../../js/scenes/Map';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Map/>
  );
});
