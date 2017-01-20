/* global __DEV__ */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { defaultTextStyle, settings } from '../../config';

export class Settings extends Component {
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

  navigate(id) {
    this.navigator.push({ id });
  }

  render() {
    const debugOptions = this.renderDebug();
    return (
      <View>
        <Header title="Settings"/>

        {settings.links.map((link, id) => (
          <View key={id}>
            <TouchableOpacity
              onPress={this.onItemPress.bind(this, link.url)}>
              <Text style={styles.text}>{link.label}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {debugOptions}

        <TouchableOpacity
          onPress={this.onBackPress}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderDebug() {
    if (!__DEV__) {
      return; 
    }
    
    return (<TouchableOpacity
      onPress={this.navigate.bind(this, 'debug')}>
      <Text style={styles.text}>Go to Debug</Text>
    </TouchableOpacity>);
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
