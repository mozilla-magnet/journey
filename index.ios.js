import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  View,
} from 'react-native';
import { theme } from './config';
import AppProvider from './js/AppProvider';

export default class MagnetJourney extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: theme.colorBackground,
        flex: 1,
      }}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(255, 255, 255, 0.7)"
          barStyle="light-content"/>
        <AppProvider/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MagnetJourney', () => MagnetJourney);
