import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

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
        <Text>Item scene</Text>
        <TouchableHighlight
          onPress={this.onMapPress}>
          <Text>Go to Map scene</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onBackPress}>
          <Text>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
