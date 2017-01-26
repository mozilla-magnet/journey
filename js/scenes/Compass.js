import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  EMPTY,
  LOCATION_ACQUIRING,
  LOCATION_ACQUIRED,
  LOCATION_ERRORED,
} from '../store/constants';

import Header from '../components/Header';
import Compass from '../components/Compass';
import { defaultTextStyle } from '../../config';

import { connect } from 'react-redux';

export class Debug extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentWillReceiveProps({ location }) {
    if (!location) {
      return;
    }
    
    this.setState({
      latitude: location.value.coords.latitude,
      longitude: location.value.coords.longitude,
    });
  }

  render() {
    return (
      <View>
        <Header
          title="Compass"
          navigator={this.navigator}/>
        <View>
          <Text style={styles.text}>To the Shard</Text>
          <Compass
            fromLat={this.state.latitude}
            fromLon={this.state.longitude}
            toLat={51.504263}
            toLon={-0.088266}/>
        </View>
        {this.renderLocation(this.props.location)}
      </View>
    );
  }

  renderLocation({ status }) {
    switch(status) {
      case EMPTY: return this.renderGeoMessage('No data');
      case LOCATION_ACQUIRED: return this.renderGeo();
      case LOCATION_ACQUIRING: return this.renderGeoMessage('Adquiring geolocation ...');
      case LOCATION_ERRORED: return this.renderGeoMessage('Error getting geolocation');
    }
  }

  renderGeoMessage(msg) {
    return(
      <Text>{msg}</Text>
    );
  }

  renderGeo() {
    const when = `${new Date(this.props.location.value.timestamp)}`;
    const latitude = this.props.location.value.coords.latitude;
    const longitude = this.props.location.value.coords.longitude;
    return(
      <Text>Last location at ({latitude},{longitude}) on {when}</Text>
    );
  }
}

Debug.propTypes = {
  navigator: PropTypes.object,
  location: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});

const mapStateToProps = ({ location }) => {
  return {
    location,
  };
};

export default connect(mapStateToProps)(Debug);
