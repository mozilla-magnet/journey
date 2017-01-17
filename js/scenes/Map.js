import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Header from '../components/Header';
import MagnetMapView from '../components/MagnetMapView';
import { defaultTextStyle } from '../../config';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <MagnetMapView
        region={{
          latitude: 51.525,
          longitude: -0.078315,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Header title="Map"/>

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </MagnetMapView>
    );
  }
}

Map.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});
