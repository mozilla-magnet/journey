import React, { Component, PropTypes } from 'react';
import { defaultTextStyle } from '../../config';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);

    // never bind functions in render(), it
    // messes with react's diffing logic
    this.onActionPress = this.onActionPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  render() {
    const { title='', style, action } = this.props;

    return (
      <View style={[styles.header, style]}>
        <View style={styles.left}>{this.renderBackButton()}</View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.center}>
          <Text
            style={styles.titleText}
            numberOfLines={1}>{title}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={this.onActionPress}>
            <Text style={styles.actionText}>{action}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderBackButton() {
    if (!this.canGoBack()) return;

    return <TouchableOpacity
      style={styles.action}
      onPress={this.onBackPress}>
      <Text style={styles.actionText}>Back</Text>
    </TouchableOpacity>;
  }

  canGoBack() {
    return this.props.navigator.getCurrentRoutes().length > 1;
  }

  onBackPress() {
    const { navigator } = this.props;
    navigator.pop();
  }

  onActionPress() {
    const { onActionPress } = this.props;
    if (!onActionPress) return;
    onActionPress();
  }
}

Header.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: PropTypes.object,
  action: PropTypes.string,
  onActionPress: PropTypes.func,
  navigator: PropTypes.object,
};

const HEADER_HEIGHT = 54;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  left: {
    flex: 1,
  },

  center: {
    flex: 2,
    alignItems: 'center',
  },

  right: {
    flex: 1,
    alignItems: 'flex-end',
  },

  action: {
    flex: 1,
    justifyContent: 'center',
  },

  actionText: {
    ...defaultTextStyle,
    color: 'white',
    fontSize: 14,
    opacity: 0.7,
  },

  titleText: {
    color: 'white',
    fontSize: 19,
    marginTop: -2,
  },
});
