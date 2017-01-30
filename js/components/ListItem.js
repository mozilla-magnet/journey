import React, { PropTypes } from 'react';
import timeAgo from '../utils/time-ago';
import Star from '../components/Star';

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
        style={[styles.row, style]}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}>
          <View style={styles.topBar}>
            <View style={styles.profile}>
              <Image
                source={{ uri: userImageUri }}
                style={styles.profileThumbnail}/>
              <View style={styles.profileTitleContainer}>
                <Text style={styles.profileTitle}>{userName.toUpperCase()}</Text>
                <Text style={styles.timestamp}>{timeAgo(timestamp)}</Text>
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
  row: {
    height: 300,
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  topBar: {
    flexDirection: 'row',
    margin: 10,
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
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
  },

  timestamp: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
  },
});
