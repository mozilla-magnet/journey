import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Header from '../components/Header';
import { defaultTextStyle } from '../../config';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onMapPress = this.onMapPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onMapPress() {
    this.navigator.push({ id: 'map' });
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <View>
        <Header title="Item"/>

        <TouchableOpacity
          onPress={this.onMapPress}>
          <Text style={styles.text}>Go to Map scene</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Item.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});
