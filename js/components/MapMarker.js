import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class MapMarker extends Component {
  render() {
    const { coordinate, source } = this.props;

    return (
      <MapView.Marker coordinate={coordinate}>
        <View style={styles.container}>
          <View style={styles.bubble}>
            <Image
              style={styles.thumbnail}
              source={source}/>
          </View>
          <View style={styles.arrowBorder}/>
          <View style={styles.arrow}/>
        </View>
      </MapView.Marker>
    );
  }
}

MapMarker.propTypes = {
  coordinate: PropTypes.object,
  source: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 0.5,
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});
