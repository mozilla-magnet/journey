import React, { PropTypes } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const DOT_SIZE = 12;
const DOT_SPACE = 6;

const ViewPagerIndicator = ({
  pageCount,
  activePage,
  scrollValue,
  scrollOffset,
}) => {
  const itemWidth = DOT_SIZE + DOT_SPACE * 2;
  const offsetX = width / 2 - itemWidth - scrollOffset * activePage;
  const left = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [offsetX, offsetX + itemWidth],
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
      <Animated.View style={[styles.curDot, { left }]}/>
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
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: DOT_SPACE,
    marginRight: DOT_SPACE,
  },
  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#fff',
    margin: DOT_SPACE,
    bottom: 0,
  },
});

export default ViewPagerIndicator;
