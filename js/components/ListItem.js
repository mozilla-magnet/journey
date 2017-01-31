import React, { PropTypes } from 'react';
import timeAgo from '../utils/time-ago';
import Star from '../components/Star';
import { theme } from '../../config';

import {
  TouchableHighlight,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

/**
 * Note: The name is turned into upper case. This is not recommended for some
 * languages. Unfortunately the CSS `text-transform: uppercase;` property is not
 * implemented in React Native.
 */

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onPress,
      imageUri,
      userName,
      userImageUri,
      timestamp = '',
      startValue = false,
      onStarChange,
      style,
    } = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.root, style]}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}>
          <View style={styles.topBar}>
            <View style={styles.profile}>
              <Image
                source={{ uri: userImageUri }}
                style={styles.profileThumbnail}/>
              <View style={styles.profileTitleContainer}>
                <Text style={styles.profileTitle}>{this.formatName(userName)}</Text>
                <Text style={styles.timestamp}>{this.formatTime(timestamp)}</Text>
              </View>
            </View>
            <Star
              value={startValue}
              onValueChange={onStarChange}/>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }

  /**
   * Capitalize and letter-space.
   *
   * @param {String} value
   */
  formatName(value) {
    return this.capitalizeAndSpace(value);
  }

  /**
   * Format a unix timestamp to 'time ago'
   * and capitalize and space letters.
   *
   * @param {Number} value
   */
  formatTime(value) {
    return this.capitalizeAndSpace(timeAgo(value));
  }

  /**
   * Capitalize and space letters.
   *
   * This is required because react-native doesn't
   * support `letterSpacing` on Android yet.
   *
   * @param {String} value
   */
  capitalizeAndSpace(value) {
    return value
      .toUpperCase()
      .split('')
      .join('\u200A');
  }
}

ListItem.propTypes = {
  onPress: PropTypes.func,
  imageUri: PropTypes.string,
  userName: PropTypes.string,
  userImageUri: PropTypes.string,
  timestamp: PropTypes.number,
  startValue: PropTypes.bool,
  onStarChange: PropTypes.func,
  style: View.propTypes.style,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  image: {
    flex: 1,
    padding: 12,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  topBar: {
    flexDirection: 'row',
  },

  profile: {
    flex: 1,
    flexDirection: 'row',
  },

  profileThumbnail: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
  },

  profileTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: -3,
  },

  profileTitle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    fontFamily: theme.fontBook,
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
    letterSpacing: 1,
  },

  timestamp: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 9,
    fontFamily: theme.fontLightItalic,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
});
