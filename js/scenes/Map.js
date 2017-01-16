import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

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
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    return (
      <View>
        <View style={[styles.container, { height, width }]}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 51.525,
              longitude: -0.078315,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <Text style={styles.header}>Map</Text>
        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Map.propTypes = {
  navigator: React.PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    ...defaultTextStyle,
    fontSize: 22,
    textAlign: 'center',
  },
  text: {
    ...defaultTextStyle,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
