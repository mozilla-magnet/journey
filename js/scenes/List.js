import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Header from '../components/Header';
import { defaultTextStyle } from '../../config';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
  }

  onItemPress(id) {
    this.navigator.push({ id });
  }

  render() {
    return (
      <View>
        <Header
          title="List"
          titleColor="white"
          style={{ backgroundColor: '#333' }}
        />

        <TouchableOpacity
          onPress={this.onItemPress.bind(this, 'item')}>
          <Text style={styles.text}>Go to Item scene</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onItemPress.bind(this, 'map')}>
          <Text style={styles.text}>Go to Map scene</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onItemPress.bind(this, 'profile')}>
          <Text style={styles.text}>Go to Profile scene</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onItemPress.bind(this, 'settings')}>
          <Text style={styles.text}>Go to Settings scene</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

List.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});
