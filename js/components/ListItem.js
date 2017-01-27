import React, { PropTypes } from 'react';
import {
  TouchableHighlight,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Star from '../components/Star';

/**
 * Note: The name is turned into upper case. This is not recommended for some
 * languages. Unfortunately the CSS `text-transform: uppercase;` property is not
 * implemented in React Native.
 */

const ListItem = ({
  onPress, imageUri,
  name, userImageUri, profileSubtitle = '',
  StarValue = false, StarOnValueChange,
  style,
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={[styles.row, style]}>
    <Image
      source={{ uri: imageUri }}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.topBar}>

        <View style={styles.profile}>
          <Image
            source={{ uri: userImageUri }}
            style={styles.profileThumbnail}/>
          <View style={styles.profileTitleContainer}>
            <Text style={styles.profileTitle}>{name.toUpperCase()}</Text>
            <Text style={styles.profileSubtitle}>{profileSubtitle}</Text>
          </View>
        </View>

        <Star
          value={StarValue}
          onValueChange={StarOnValueChange}/>
      </View>
    </Image>
  </TouchableHighlight>
);

ListItem.propTypes = {
  onPress: PropTypes.func,
  imageUri: PropTypes.string,

  name: PropTypes.string,
  userImageUri: PropTypes.number,
  profileSubtitle: PropTypes.string,

  StarValue: PropTypes.bool,
  StarOnValueChange: PropTypes.func,

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
    height: 24,
    width: 24,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 2,
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
  profileSubtitle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 2,
  },
});

export default ListItem;
