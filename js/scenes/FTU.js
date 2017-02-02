import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import ViewPagerIndicator from '../components/ViewPagerIndicator';
import { connect } from 'react-redux';
import { theme } from '../../config';

const CONTENT = [
  {
    title: 'Hear the story of London\'s vibrant street art',
    main: 'This month Project Magnet brings you a selection of amazing street art from around London.',
    footer: 'Not in London? Tell us where you\'d like to go next.',
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
        resizeMode="cover"
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
        <Text style={styles.title}>{DATA.title.toUpperCase()}</Text>
        <Text style={styles.text}>{DATA.main}</Text>
        <View style={styles.button}>
          <View style={styles.border}>
            <Button
              title="GET STARTED"
              accessibilityLabel="Continue to the next screen."
              onPress={() => this.refs.viewPager.goToPage(1)}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
        </View>
        <Text style={styles.text}>{DATA.footer}</Text>
      </View>
    );
  }

  renderPage2() {
    const DATA = CONTENT[1];

    return (
      <View style={styles.screen}>
        <Text style={styles.title}>{DATA.title.toUpperCase()}</Text>
        <Text style={styles.text}>{DATA.main}</Text>
        <View style={styles.button}>
          <View style={styles.border}>
            <Button
              title="TURN ON"
              accessibilityLabel="Turn on notifications."
              onPress={() => this.navigator.push({ id: 'home' })}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
          <View style={styles.border}>
            <Button
              title="SKIP"
              accessibilityLabel="Skip this step."
              onPress={() => this.navigator.push({ id: 'home' })}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
        </View>
      </View>
    );
  }

  static propTypes = {
    navigator: PropTypes.object,
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  viewPager: {
    flex: 1,
  },
  scrim: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  screen: {
    width,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: theme.fontBook,
    fontSize: 30,
    lineHeight: Math.round(30 * 1.5),
    color: 'white',
  },
  text: {
    fontFamily: theme.fontBook,
    fontSize: 20,
    lineHeight: Math.round(20 * 1.5),
    color: 'white',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  border: {
    width: width / 2,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    padding: 4,
    marginBottom: 10,
  },
});

export default connect()(FTU);
