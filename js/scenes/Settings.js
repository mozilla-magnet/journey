import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';

import { settings } from '../../config';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.navigator.pop();
  }

  onItemPress(url) {
    if (!url) {
      return;
    }
    Linking.openURL(url).catch((err) => {
      console.info(`Could not open url ${url} `, err);
    });
  }

  render() {
    return (
      <View>
        <Text>Settings scene</Text>

        {settings.links.map((link, id) => (
          <View key={id}>
            <View style={styles.separator}/>
            <TouchableOpacity
              onPress={this.onItemPress.bind(this, link.url)}>
              <Text>{link.label}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Settings.propTypes = {
  navigator: React.PropTypes.object,
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
