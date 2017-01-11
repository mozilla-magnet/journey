import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
        <Text style={styles.header}>List</Text>
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
});
