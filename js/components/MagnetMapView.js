import React, { Component, PropTypes } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class MagnetMapView extends Component {
  render() {
    const { height, width } = Dimensions.get('window');
    const { region } = this.props;

    return (
      <View style={[styles.container, { height, width }]}>
        <MapView
          style={styles.map}
          region={region}
        />
        {this.props.children}
      </View>
    );
  }
}

MagnetMapView.propTypes = {
  region: PropTypes.object,
  children: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
