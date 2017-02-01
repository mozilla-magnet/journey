import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class MagnetMapMarker extends Component {
  render() {
    const {
      id,
      source,
      onPress,
      coordinate,
    } = this.props;

    return (
      <MapView.Marker
        identifier={String(id)}
        coordinate={coordinate}
        onPress={() => onPress(id)}>
        <View style={styles.container}>
          <Image
            source={source}
            style={styles.image}/>
          <View style={styles.arrow}/>
        </View>
      </MapView.Marker>
    );
  }
}

MagnetMapMarker.propTypes = {
  coordinate: PropTypes.object,
  source: Image.propTypes.source,
  onPress: PropTypes.func,
  id: PropTypes.number,
};

const IMAGE_WIDTH = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderColor: '#fff',
    borderWidth: 1.5,
    borderRadius: IMAGE_WIDTH / 2,
    resizeMode: 'cover',
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
