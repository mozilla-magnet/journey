import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

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
        <Text>List scene</Text>
        <TouchableHighlight
          onPress={this.onItemPress.bind(this, 'item')}>
          <Text>Go to Item scene</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onItemPress.bind(this, 'map')}>
          <Text>Go to Map scene</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onItemPress.bind(this, 'profile')}>
          <Text>Go to Profile scene</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onItemPress.bind(this, 'settings')}>
          <Text>Go to Settings scene</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

List.propTypes = {
  navigator: React.PropTypes.object,
};
