import React, { Component, PropTypes } from 'react';
import MapView from 'react-native-maps';
import mapStyle from './style';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class MagnetMapView extends Component {
  render() {
    const { style } = this.props;
    const { region } = this.props;

    return (
      <View style={[styles.root, style]}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          customMapStyle={mapStyle}
        />
        {this.props.children}
      </View>
    );
  }
}

MagnetMapView.propTypes = {
  region: PropTypes.object,
  children: PropTypes.array,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
