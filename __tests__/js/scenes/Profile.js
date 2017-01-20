import 'react-native';
import React from 'react';
import { Profile } from '../../../js/scenes/Profile';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Profile/>
  );
});
