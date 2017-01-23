import React, { Component, PropTypes } from 'react';
import MapView from 'react-native-maps';
import mapStyle from './style';
import MagnetMapMarker from './MagnetMapMarker';

import {
  View,
  StyleSheet,
} from 'react-native';

export default class MagnetMap extends Component {
  render() {
    const { style, region, children } = this.props;
    return (
      <View style={[styles.root, style]}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          customMapStyle={mapStyle}>
          {children}
        </MapView>
      </View>
    );
  }
}

MagnetMap.propTypes = {
  region: PropTypes.object,
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  style: View.propTypes.style,
};

// expose `MagnetMapMarker`
MagnetMap.Marker = MagnetMapMarker;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
