import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default class MagnetMapMarker extends Component {
  constructor(props) {
    super(props);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.state = {
      imageLoaded: false,
    };
  }

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
          <View style={styles.image}>
            <Image
              key={this.state.imageLoaded && 'loaded'}
              source={source}
              onLoad={this.onImageLoad}
              style={styles.imageNode}/>
          </View>
          <View style={styles.arrow}/>
        </View>
      </MapView.Marker>
    );
  }

  /**
   * Force image to redraw in android.
   *
   * There's a bug causes images that load for the
   * first time not to show up in custom map markers:
   *
   * https://github.com/airbnb/react-native-maps/issues/100
   */
  onImageLoad() {
    if (Platform.OS !== 'android') return;
    this.setState({ imageLoaded: true });
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
    borderRadius: IMAGE_WIDTH / 2,
    backgroundColor: 'white',
  },

  imageNode: {
    flex: 1,
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
