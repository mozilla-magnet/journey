import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MagnetMapView from '../components/MagnetMapView';
import MapMarker from '../components/MapMarker';

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
      <View style={styles.root}>
        <Header
          title="Map"
          navigator={this.navigator}/>
        <MagnetMapView
          style={styles.map}
          region={{
            latitude: 51.504589,
            longitude: -0.0992752,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0321,
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
          />
      </View>
    );
  }
}

Map.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  map: {
    flex: 1,
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
