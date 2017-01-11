import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { defaultTextStyle } from '../../config';

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
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Profile.propTypes = {
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
