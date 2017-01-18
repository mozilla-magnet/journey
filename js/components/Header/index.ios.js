import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Header = ({ title = '', titleColor = 'white', style }) => {
  return (
    <View style={[styles.header, style]}>
      <View
        accessible={true}
        accessibilityLabel={title}
        accessibilityTraits="header"
        style={styles.center}>
        <Text style={[styles.titleText, { color: titleColor }]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  style: PropTypes.object,
};

export default Header;

const STATUS_BAR_HEIGHT = 20;
const HEADER_HEIGHT = 44 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
