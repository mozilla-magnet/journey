import React, { Component, PropTypes } from 'react';
import MapView from 'react-native-maps';
import mapStyle from './style';
import MagnetMapMarker from './MagnetMapMarker';

import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';

export default class MagnetMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        customMapStyle={mapStyle}>
        {children}
      </MapView>
    );
  }
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
