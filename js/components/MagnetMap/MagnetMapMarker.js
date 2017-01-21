import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class MagnetMapMarker extends Component {
  render() {
    const { coordinate, source } = this.props;

    return (
      <MapView.Marker coordinate={coordinate}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            resizeMode={Image.resizeMode.cover}
            source={source}/>
          <View style={styles.arrow}/>
        </View>
      </MapView.Marker>
    );
  }
}

MagnetMapMarker.propTypes = {
  coordinate: PropTypes.object,
  source: Image.propTypes.source,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

  thumbnail: {
    width: 50,
    height: 50,

    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 2,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 100,
  },

  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -1,
  },
});
