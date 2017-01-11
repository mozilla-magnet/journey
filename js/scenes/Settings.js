import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';

import { defaultTextStyle, settings } from '../../config';

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
        <Text style={styles.header}>Settings</Text>

        {settings.links.map((link, id) => (
          <View key={id}>
            <View style={styles.separator}/>
            <TouchableOpacity
              onPress={this.onItemPress.bind(this, link.url)}>
              <Text style={styles.text}>{link.label}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Settings.propTypes = {
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

  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
