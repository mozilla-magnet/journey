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

const Star = ({ value, onValueChange }) => {
  const source = value ? IMAGES.ON : IMAGES.OFF;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onValueChange}>
      <Image source={source}/>
    </TouchableOpacity>
  );
};

Star.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    margin: 10,
  },
});

export default Star;
