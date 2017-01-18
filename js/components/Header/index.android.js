import React, { PropTypes } from 'react';
import {
  View,
  ToolbarAndroid,
  StyleSheet,
} from 'react-native';

const Header = ({ title = '', titleColor = 'white', style }) => {
  return (
    <View style={[styles.toolbarContainer, style]}>
      <ToolbarAndroid
        title={title}
        titleColor={titleColor}
        style={styles.toolbar}/>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: PropTypes.object,
};

export default Header;

// The status bar is 24px height in Android:
// https://material.io/guidelines/layout/structure.html#structure-system-bars
const STATUS_BAR_HEIGHT = 24;

// An default app bar is 56px height in Android:
// https://material.io/guidelines/layout/structure.html#structure-app-bar
const HEADER_HEIGHT = 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
    backgroundColor: '#333',
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
});
