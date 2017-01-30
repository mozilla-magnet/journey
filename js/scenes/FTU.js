import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { connect } from 'react-redux';

export class FTU extends Component {
  render() {
    return (
      <Image
        source={require('../images/ftu/background.jpg')}
        resizeMode="cover"
        style={styles.container}>
        <Carousel
          autoplay={false}
          bullets={true}
          bulletStyle={styles.bulletStyle}
          onAnimateNextPage={(p) => console.log(p)}
          style={styles.carousel}>
          {this.renderPage1()}
          {this.renderPage2()}
        </Carousel>
      </Image>
    );
  }

  renderPage1() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>{'Hear the story of London vibrant street art'.toUpperCase()}</Text>
        <Text style={styles.text}>This month Project Magnet brings you a selection of amazing street art from around London.</Text>
        <View style={styles.button}>
          <View style={styles.border}>
            <Button
              title="GET STARTED"
              accessibilityLabel="Continue to the next screen."
              onPress={() => {}}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
        </View>
        <Text style={styles.text}>Not in London? Tell us where you&#39;d like to go next.</Text>
      </View>
    );
  }

  renderPage2() {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>{'Turn on notifications?'.toUpperCase()}</Text>
        <Text style={styles.text}>Notifications can alert you when you're close to a point of interest, even when you're not inside the app.</Text>
        <View style={styles.button}>
          <View style={styles.border}>
            <Button
              title="TURN ON"
              accessibilityLabel="Turn on notifications."
              onPress={() => {}}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
          <View style={styles.border}>
            <Button
              title="SKIP"
              accessibilityLabel="Skip this step."
              onPress={() => {}}
              color={Platform.OS === 'ios' ? 'white' : 'transparent'}/>
          </View>
        </View>
      </View>
    );
  }
}

FTU.propTypes = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  carousel: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bulletStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 0,
  },
  screen: {
    width,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    lineHeight: Math.round(30 * 1.5),
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
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
