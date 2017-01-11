import 'react-native';
import React from 'react';
import Settings from '../../../js/scenes/Settings';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Settings/>
  );
});
