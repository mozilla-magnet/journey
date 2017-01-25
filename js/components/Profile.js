import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

/**
 * Note: The name is turned into upper case. This is not recommended for some
 * languages. Unfortunately the CSS `text-transform: uppercase;` property is not
 * implemented in React Native.
 */

const Profile = ({ name, source, subtitle = '', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={styles.thumbnail}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  source: PropTypes.number,
  subtitle: PropTypes.string,
  style: View.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  thumbnail: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: -3,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
  },
  subtitle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
  },
});

export default Profile;
