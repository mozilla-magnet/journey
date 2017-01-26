import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const IMAGES = {
  OFF: require('./assets/star-border.png'),
  ON: require('./assets/star.png'),
};

const Star = ({ value = false, onValueChange, style }) => {
  const source = value ? IMAGES.ON : IMAGES.OFF;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onValueChange}>
      <Image source={source}/>
    </TouchableOpacity>
  );
};

Star.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  style: Image.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
  },
});

export default Star;
