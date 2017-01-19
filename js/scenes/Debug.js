import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/Header';
import Compass from '../components/Compass';
import { defaultTextStyle } from '../../config';

export default class Debug extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  onBackPress() {
    this.navigator.pop();
  }

  componentDidMount() { 
    navigator.geolocation.getCurrentPosition( (position) => { 
      var initialPosition = JSON.stringify(position); 
      this.setState({initialPosition}); 
    }
      , (error) => console.log(JSON.stringify(error)), 
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    ); 
    this.watchID = navigator.geolocation.watchPosition((position) => { 
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude, 
      }); 
    }); 
  }

  // Watch for position for testing the compass
  componentWillUnmount() { 
    navigator.geolocation.clearWatch(this.watchID); 
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <View>
        <Header title="Debug"/>
        <View>
          <Text style={styles.text}>To the Shard</Text>
          <Compass
            fromLat={this.state.latitude}
            fromLon={this.state.longitude}
            toLat={51.504263}
            toLon={-0.088266}/>
        </View>

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Debug.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});
