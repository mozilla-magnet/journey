import React, { Component, PropTypes } from 'react';
import { getMidpoint, getDelta } from '../../utils/location';
import MagnetMapMarker from './MagnetMapMarker';
import MapView from 'react-native-maps';
import mapStyle from './style';

import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';

export default class MagnetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: getRegionFromMarkers(props.children),
      usePlaceHolder: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        usePlaceHolder: false,
      });
    });
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.root, style]}>
        {this.renderMap()}
      </View>
    );
  }

  renderMap() {
    if (this.state.usePlaceHolder) {
      return;
    }

    const { region, children } = this.props;
    return (
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        moveOnMarkerPress={false}
        customMapStyle={mapStyle}>
        {children}
      </MapView>
    );
  }
}

function getRegionFromMarkers(children) {
  const points = [].concat(children).map(({ props: { coordinate } }) => coordinate);
  const midPoint = getMidpoint(points);
  const delta = getDelta(points, midPoint);
  const PADDING = 0.02;

  return {
    ...midPoint,
    latitudeDelta: clampZoom(delta.latitude + PADDING),
    longitudeDelta: clampZoom(delta.longitude + PADDING),
  };
}

function clampZoom(delta) {
  return Math.min(4, Math.max(0.04, delta));
}

MagnetMap.propTypes = {
  region: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
