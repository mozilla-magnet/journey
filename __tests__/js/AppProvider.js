import 'react-native';
import React from 'react';
import AppProvider from '../../js/AppProvider';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <AppProvider/>
  );
});
