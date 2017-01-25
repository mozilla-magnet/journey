/* global require */
import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Share from 'react-native-share';

export default class SocialShare extends Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
  }

  share() {
    let shareOptions = Object.assign({}, this.props);

    Share.open(shareOptions);
  }

  render() {
    return(
      <TouchableOpacity
        style = { [ styles.container, this.props.style ] }
        onPress = { this.share }>
        <Image source = { require('./assets/share.png') }/>
      </TouchableOpacity>
    );
  }
}

SocialShare.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
  subject: PropTypes.string,
  style: Image.propTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
  },
});
