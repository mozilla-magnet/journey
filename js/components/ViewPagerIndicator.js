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

const ViewPagerIndicator = ({
  pageCount,
  activePage,
  scrollValue,
  scrollOffset,
}) => {
  const offsetX = (width - DOT_FULL_WIDTH * pageCount) / 2 +
    (activePage - scrollOffset) * DOT_FULL_WIDTH;
  const left = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [offsetX, offsetX + DOT_FULL_WIDTH],
  });

  const indicators = [];
  for (let i = 0; i < pageCount; i++) {
    indicators.push((
      <View key={i} style={styles.tab}>
        <View style={styles.dot}/>
      </View>
    ));
  }

  return (
    <View style={styles.tabs}>
      {indicators}
      <Animated.View style={[styles.dot, styles.selectedDot, { left }]}/>
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
  tab: {
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: DOT_SPACING,
  },
  selectedDot: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
});

export default ViewPagerIndicator;
