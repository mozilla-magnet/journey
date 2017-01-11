import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Profile extends Component {
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
      <View>
        <Text>Profile scene</Text>
        <TouchableHighlight
          onPress={this.onBackPress}>
          <Text>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: React.PropTypes.object,
};
