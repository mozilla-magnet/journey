import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import MagnetMapView from '../components/MagnetMapView';

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
          }}/>
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
