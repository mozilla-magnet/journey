import React, { PropTypes } from 'react';
import {
  View,
  ToolbarAndroid,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

const HeaderAndroid = ({ title, titleColor = 'white', style }) => {
  return (
    <View style={[styles.toolbarContainer, style]}>
      <ToolbarAndroid
        title={title}
        titleColor={titleColor}
        style={styles.toolbar}/>
    </View>
  );
};

HeaderAndroid.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: PropTypes.object,
};

const HeaderIOS = ({ title, titleColor = 'white', style }) => {
  return (
    <View style={[styles.header, style]}>
      <View
        accessible={true}
        accessibilityLabel={title}
        accessibilityTraits="header"
        style={styles.centerItem}>
        <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

HeaderIOS.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: PropTypes.object,
};

// The status bar is 24px height in Android:
// https://material.io/guidelines/layout/structure.html#structure-system-bars
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

// An default app bar is 56px height in Android:
// https://material.io/guidelines/layout/structure.html#structure-app-bar
const HEADER_HEIGHT = Platform.OS === 'ios' ?
  44 + STATUS_BAR_HEIGHT :
  56 + STATUS_BAR_HEIGHT;

const Header = Platform.OS === 'ios' ? HeaderIOS : HeaderAndroid;
export default Header;

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
});
