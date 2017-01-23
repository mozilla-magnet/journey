import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  EMPTY,
  GEO_ADQUIRING,
  GEO_ADQUIRED,
  GEO_ERROR,
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

  componentWillReceiveProps({ geolocation }) {
    if (!geolocation) {
      return;
    }

    this.setState({
      latitude: geolocation.value.coords.latitude,
      longitude: geolocation.value.coords.longitude,
    });
  }

  renderLocation({ status }) {
    switch(status) {
      case EMPTY: return this.renderGeoMessage('No data');
      case GEO_ADQUIRED: return this.renderGeo();
      case GEO_ADQUIRING: return this.renderGeoMessage('Adquiring geolocation ...');
      case GEO_ERROR: return this.renderGeoMessage('Error getting geolocation');
    }
  }

  renderGeoMessage(msg) {
    return(
      <Text>{msg}</Text>
    );
  }

  renderGeo() {
    var when = new Date(this.props.geolocation.value.timestamp);
    when = '' + when;
    const latitude = this.props.geolocation.value.coords.latitude;
    const longitude = this.props.geolocation.value.coords.longitude;
    return(
      <Text>Last location at ({latitude},{longitude}) on {when}</Text>
    );
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
        {this.renderLocation(this.props.geolocation)}
      </View>
    );
  }
}

Debug.propTypes = {
  navigator: PropTypes.object,
  geolocation: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});

const mapStateToProps = ({ geolocation }) => {
  return {
    geolocation,
  };
};

export default connect(mapStateToProps)(Debug);
