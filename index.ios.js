import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import { theme } from './config';
import AppProvider from './lib/AppProvider';

export default class MagnetJourney extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: theme.colorBackground,
        paddingTop: 20,
        flex: 1,
        }}>
        <AppProvider/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MagnetJourney', () => MagnetJourney);
