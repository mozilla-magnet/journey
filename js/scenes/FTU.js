import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MagnetPager from '../components/MagnetPager';
import ButtonPrimary from '../components/ButtonPrimary';
import { connect } from 'react-redux';
import { theme } from '../../config';

const CONTENT = [
  {
    title: 'Hear the story of London\'s vibrant street art',
    main: 'This month Project Magnet brings you a selection of amazing street art from around London.',
    footer: 'Not in London? Tell us where you\'d like us to go next.',
  },
  {
    title: 'Turn on notifications?',
    main: 'Notifications can alert you when you\'re close to a point of interest, even when you\'re not inside the app.',
  },
];

export class FTU extends Component {
  constructor(props) {
    super(props);
    this.navigator = this.props.navigator;

    this.pages = [
      () => this.renderPage1(),
      () => this.renderPage2(),
    ];
  }

  render() {
    return (
      <Image
        source={require('../images/ftu/background.jpg')}
        style={styles.container}>
        <View style={styles.scrim}>
          <MagnetPager
            ref="pager"
            style={styles.viewPager}
            locked={true}
            showIndicator={true}
            pages={this.pages}/>
        </View>
      </Image>
    );
  }

  renderPage1() {
    const { title, main, footer } = CONTENT[0];

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.scrollerContent}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.text}>{main}</Text>
          <Text style={styles.text}>{footer}</Text>
        </ScrollView>
        <View style={styles.footer}>
          <ButtonPrimary
            text="GET STARTED"
            onPress={() => this.refs.pager.goToPage(1)}/>
        </View>
      </View>
    );
  }

  renderPage2() {
    const DATA = CONTENT[1];

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.scrollerContent}>
          <Text style={styles.title}>{DATA.title.toUpperCase()}</Text>
          <Text style={styles.text}>{DATA.main}</Text>
        </ScrollView>
        <View style={styles.footer}>
          <ButtonPrimary
            text="TURN ON"
            onPress={() => this.navigator.push({ id: 'home' })}/>
          <TouchableOpacity
            accessibilityLabel="Skip this step"
            onPress={() => this.navigator.push({ id: 'home' })}
            style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigator: PropTypes.object,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  viewPager: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  scroller: {
    flex: 1,
  },

  scrollerContent: {
    padding: 28,
    paddingTop: 30,
  },

  footer: {
    padding: 25,
    alignItems: 'center',
  },

  title: {
    fontFamily: theme.fontExtraLight,
    fontSize: 37,
    marginBottom: 20,
    lineHeight: Math.round(30 * 1.45),
    color: 'white',
  },

  text: {
    marginBottom: 17,
    fontFamily: theme.fontLight,
    fontSize: 19,
    lineHeight: Math.round(20 * 1.55),
    color: 'white',
  },

  buttonSecondary: {
    marginTop: 20,
  },

  buttonSecondaryText: {
    fontFamily: theme.fontBook,
    color: 'white',
    opacity: 0.8,
  },
});

export default connect()(FTU);
