import React, { PropTypes } from 'react';
import { theme } from '../../config';

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ButtonPrimary = ({
  accessibilityLabel,
  onPress,
  text,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.root}
      accessibilityLabel={accessibilityLabel || text}>
      {renderIcon(icon)}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

function renderIcon(icon) {
  if (!icon) return;
}

ButtonPrimary.propTypes = {
  onPress: PropTypes.func,
  accessibilityLabel: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
};

const styles = StyleSheet.create({
  root: {
    height: 45,
    paddingHorizontal: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 22,

    // shadow android
    elevation: 2,

    // shadow ios
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: theme.fontLight,
  },
});

export default ButtonPrimary;
