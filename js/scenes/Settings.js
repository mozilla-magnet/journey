/* global __DEV__ */

import { defaultTextStyle, settings } from '../../config';
import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.navigator = this.props.navigator;
  }

  onItemPress(url) {
    if (!url) {
      return;
    }
    Linking.openURL(url).catch((err) => {
      console.info(`Could not open url ${url} `, err);
    });
  }

  navigate(id) {
    this.navigator.push({ id });
  }

  render() {
    return (
      <View>
        <Header
          title="Settings"
          navigator={this.navigator}/>
        {settings.links.map((link, id) => (
          <View key={id}>
            <TouchableOpacity
              onPress={this.onItemPress.bind(this, link.url)}>
              <Text style={styles.text}>{link.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
        {this.renderDebug()}
      </View>
    );
  }

  renderDebug() {
    if (!__DEV__) {
      return;
    }

    return (
      <TouchableOpacity
      onPress={() => this.navigator.push({ id: 'demos' })}>
        <Text style={styles.text}>Component Demos</Text>
      </TouchableOpacity>
    );
  }
}

Settings.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
