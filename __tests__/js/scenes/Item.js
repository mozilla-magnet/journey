import 'react-native';
import React from 'react';
import { Item } from '../../../js/scenes/Item';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Item/>
  );
});
