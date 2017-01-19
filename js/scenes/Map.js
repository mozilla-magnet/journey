import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MagnetMapView from '../components/MagnetMapView';
import MapMarker from '../components/MapMarker';
import { defaultTextStyle } from '../../config';

export class Map extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <MagnetMapView
        region={{
          latitude: 51.525,
          longitude: -0.078315,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        renderMarkers={() => (
          <MapMarker
            coordinate={{
              latitude: 51.504444,
              longitude: -0.086667,
            }}
            source={{
              uri:'https://media-cdn.tripadvisor.com/media/photo-s/07/a2/b2/e6/shoreditch-street-art.jpg',
            }}/>
        )}
      >

        <Header title="Map"/>

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </MagnetMapView>
    );
  }
}

Map.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
    color: 'white',
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
