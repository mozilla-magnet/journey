import React, { PropTypes } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const DOT_SIZE = 12;
const DOT_SPACING = DOT_SIZE / 2;
const DOT_FULL_WIDTH = DOT_SIZE + DOT_SPACING * 2;

/**
 * This component is used to style the dots (or bullets) used by
 * react-native-viewpager. It's a purely stateless functional component that is
 * only concerned with rendering the dots and transitioning the active dot from
 * one page of the view pager to another.
 *
 * @param pageCount {number} The total number of pages.
 * @param activePage {number} The currently active page.
 * @param scrollValue {Animated.Value} Used to transition the active dot.
 * @param scrollOffset {number} Used to reset dot position after a transition.
 * @return {Component}
 */
const ViewPagerIndicator = ({
  pageCount,
  activePage,
  scrollValue,
  scrollOffset,
}) => {
  // Initial left position of the active dot used during transition.
  const offsetX = (width - DOT_FULL_WIDTH * pageCount) / 2 +
    (activePage - scrollOffset) * DOT_FULL_WIDTH;
  // The CSS `left` property.
  const left = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [offsetX, offsetX + DOT_FULL_WIDTH],
  });

  // Create the elements for the inactive dots.
  const indicators = [];
  for (let i = 0; i < pageCount; i++) {
    indicators.push(
      <View key={i} style={styles.dot}/>
    );
  }

  return (
    <View style={styles.container}>
      {indicators}
      <Animated.View style={[styles.dot, styles.activeDot, { left }]}/>
    </View>
  );
};

ViewPagerIndicator.propTypes = {
  goToPage: PropTypes.func,
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  scrollValue: PropTypes.object,
  scrollOffset: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: DOT_SPACING,
  },
  activeDot: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
});

export default ViewPagerIndicator;
