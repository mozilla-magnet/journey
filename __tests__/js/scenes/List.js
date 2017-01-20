import 'react-native';
import React from 'react';
import { List } from '../../../js/scenes/List';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <List/>
  );
});
