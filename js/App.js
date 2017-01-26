import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  BackAndroid,
  View,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';

import { theme } from '../config';

import Settings from './scenes/Settings';
import Profile from './scenes/Profile';
import Compass from './scenes/Compass';
import Demos from './scenes/Demos';
import Home from './scenes/Home';
import Item from './scenes/Item';
import Map from './scenes/Map';

import { connect } from 'react-redux';
import { watchLocation } from './store/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = {
      home: { component: Home },
      item: { component: Item },
      map: { component: Map },
      profile: { component: Profile },
      settings: { component: Settings },
      compass: { component: Compass },
      demos: { component: Demos },
    };

    this.renderScene = this.renderScene.bind(this);
    this.onAndroidBack = this.onAndroidBack.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(watchLocation());

    BackAndroid.addEventListener('hardwareBackPress', this.onAndroidBack);
    // Linking.addEventListener('url', this.onDeepLink);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onAndroidBack);
    // Linking.getInitialURL().then((url) => this.onDeepLink({ url }));
    // Linking.removeEventListener('url', this.onDeepLink);
  }

  /**
   * Responds to Android hardware back button.
   *
   * Returning `false` indicates the app
   * isn't handling the event and allows
   * the system to respond.
   *
   * @return {Boolean}
   */
  onAndroidBack() {
    const { navigator } = this.refs;

    if (!navigator) {
      return false;
    }

    const stack = navigator.getCurrentRoutes();

    if (stack.length > 1) {
      navigator.pop();
      return true;
    }

    // let system handle event
    // (minimises android app)
    return false;
  }

  onDeepLink({ url }) {
    if (!url) {
      return;
    }

    console.log('App#onDeepLink()', url);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <Navigator
          ref="navigator"
          initialRoute={{ id: 'home' }}
          renderScene={this.renderScene}
          sceneStyle={styles.scene}/>
      </View>
    );
  }

  renderScene({ id, data }, navigator) {
    switch (id) {
      case 'item': return <Item itemId={data.itemId} navigator={navigator}/>;
      default:
        var Component = this.routes[id].component;
        return <Component navigator={navigator}/>;
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorBackground,
  },

  scene: {
    backgroundColor: '#333',
    paddingTop: Platform.OS === 'ios' ? 20 : 24,
  },
});

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(App);
