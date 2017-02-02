import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import ViewPagerIndicator from '../components/ViewPagerIndicator';
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

    const PAGES = [
      () => this.renderPage1(),
      () => this.renderPage2(),
    ];
    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.state = {
      dataSource: dataSource.cloneWithPages(PAGES),
    };
  }

  render() {
    return (
      <Image
        source={require('../images/ftu/background.jpg')}
        style={styles.container}>
        <View style={styles.scrim}>
          <ViewPager
            ref="viewPager"
            autoPlay={false}
            isLoop={false}
            locked={true}
            dataSource={this.state.dataSource}
            renderPage={(render) => render()}
            renderPageIndicator={() => <ViewPagerIndicator/>}
            style={styles.viewPager}/>
        </View>
      </Image>
    );
  }

  renderPage1() {
    const DATA = CONTENT[0];

    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroller}
          contentContainerStyle={styles.scrollerContent}>
          <Text style={styles.title}>{DATA.title.toUpperCase()}</Text>
          <Text style={styles.text}>{DATA.main}</Text>
          <Text style={styles.text}>{DATA.footer}</Text>
        </ScrollView>
        <View style={styles.footer}>
          <ButtonPrimary
            text="GET STARTED"
            onPress={() => this.refs.viewPager.goToPage(1)}/>
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
    color: 'white',
    opacity: 0.8,
  },
});

export default connect()(FTU);
