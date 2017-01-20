import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <View>
        <Header
          title="Profile"
          navigator={this.navigator}/>
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: PropTypes.object,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
