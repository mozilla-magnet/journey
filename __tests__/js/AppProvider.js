import AppProvider from '../../js/AppProvider';
import renderer from 'react-test-renderer';
import React from 'react';
import 'react-native';

it('renders correctly', () => {
  const tree = renderer.create(
    <AppProvider/>
  );
});
