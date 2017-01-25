import { fetchItemsIfNeeded } from '../store/actions';
import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import Star from '../components/Star';

import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  ListView,
  StyleSheet,
  PanResponder,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import {
  FETCHED,
  FETCHING,
  ERRORED,
  EMPTY,
} from '../store/constants';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;

    // never bind functions in render(), it
    // messes with react's diffing logic
    this.onSettingsPress = this.onSettingsPress.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onPanEnd = this.onPanEnd.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      listY: new Animated.Value(0),
    };

    // create a clamped property that we can
    // use for translating the list view
    this.translateY = this.state.listY.interpolate({
      inputRange: [0, Header.HEIGHT],
      outputRange: [0, Header.HEIGHT],
      extrapolate: 'clamp',
    });

    // fades the header in/out in sync with list position
    this.opacity = this.translateY.interpolate({
      inputRange: [0, Header.HEIGHT],
      outputRange: [0, 1],
    });

    // scales the header in/out in sync with list position
    this.scale = this.translateY.interpolate({
      inputRange: [0, Header.HEIGHT],
      outputRange: [0.95, 1],
    });

    // tracks view's Y value before offset applied
    this.baseY = 0;

    // tracks previous Y value before offset applied
    this.previousBaseY = 0;

    // tracks Y position of the list including the offset
    this.offsetY = 0;

    // tracks Y offset applied to the baseY
    this.yOffset = 0;

    // tracks final rendered Y position of the view
    this.clampedY = 0;

    // tracks if scrolling is enabled on the ListView
    this.scrollEnabled = true;

    // tracks current scroll position of the ListView
    this.scrollY = 0;

    this.state.listY.addListener((e) => {
      const offsetY = e.value;

      this.offsetY = offsetY;
      this.clampedY = this.clamp(this.offsetY).value;

      // adjusting the offset during animations introduces bugs
      if (!this.isPanning) return;

      // get any delta between the current offsetY
      // and the clampedY so that we can correct it
      const deltaY = offsetY - this.clampedY;

      // apply the delta to the offset ensuring that when the
      // user's finger drags beyond the clamped zone, the moment
      // they drag it in the opposite direction, the view responds
      this.setOffset(this.yOffset - deltaY);
    });
  }

  componentWillMount() {
    this.panHandlers = this.createPanHandlers();
  }

  createPanHandlers() {
    return PanResponder.create({

      /**
       * Decides whether to handle the current gesture
       * based on the very first touch start.
       *
       * If the header is visible we know that our panHandler
       * should take control of the gesture. If it's not
       * visible we let the 'move' handler below decide
       * whether to translate the view or let the
       * `ListView` scroll.
       *
       * @return {Boolean}
       */
      onStartShouldSetPanResponderCapture: () => {
        const headerVisible = this.headerVisible();
        const shouldSetPanHandler = headerVisible;
        this.setScrollEnabled(!shouldSetPanHandler);
        return shouldSetPanHandler;
      },

      /**
       * Decides whether to handle the current move event.
       *
       * By default the ListView is scrollable, under certain
       * conditions we disable the scroller and hand over
       * control to the pan-responder to translate the
       * view and reveal/hide the header.
       *
       * @param  {NativeEvent} e
       * @param  {Number} dy
       * @return {Boolean}
       */
      onMoveShouldSetPanResponderCapture: (e, { dy }) => {
        const scrollAtTop = this.scrollY < 3;
        const headerVisible = this.headerVisible();
        const panningDown = dy > 3;
        const isPanning = Math.abs(dy) > 3;
        const shouldSetPanHandler = isPanning && (headerVisible || scrollAtTop && panningDown);
        const scrollEnabled = !shouldSetPanHandler;

        this.setScrollEnabled(scrollEnabled);

        return shouldSetPanHandler;
      },

      /**
       * Always attempt to keep control of the gesture.
       *
       * @return {Boolean}
       */
      onPanResponderTerminationRequest: () => false,

      /**
       * Called when we're granted control over the gesture events.
       *
       * We use this event to reset the the value to 0.
       * When .setValue() is called on the 'move' event
       * the value + the current offset must fall in
       * the range: 0 - Header.HEIGHT.
       */
      onPanResponderGrant: () => {
        this.setOffset(this.offsetY);
        this.setValue(0);
        this.isPanning = true;
      },

      /**
       * Updates the Animated.Value that is
       * linked to view components.
       *
       * @param  {NativeEvent} e
       * @param  {Number} dy - the delta between current and start
       */
      onPanResponderMove: (e, { dy }) => {
        this.setValue(dy);
      },

      onPanResponderRelease: this.onPanEnd,

      /**
       * Called when touch handling is stolen
       * by the `ListView`.
       *
       * This tends to only happen on android
       * when the list is swiped very fast.
       *
       * This handler contains logic to reveal the
       * header when the list is at the top and
       * the gesture is in a downward direction.
       *
       * @param  {Event} e
       * @param  {Object} gesture
       */
      onPanResponderTerminate: (e, gesture) => {
        const isPanningDown = gesture.dy >= 0;
        const scrollAtTop = this.scrollY === 0;

        if (isPanningDown && scrollAtTop) this.snapOpen();
        else this.onPanEnd(e, gesture);
      },
    }).panHandlers;
  }

  /**
   * Called when the interaction ends. This can
   * either be when the user finishes the
   * gesture, or the nested ListView steals
   * control from our pan-responder.
   *
   * Either way we make decision as to whether
   * the header is snapped open or closed.
   *
   * @param {Event} e
   * @param {Object} gesture
   */
  onPanEnd(e, gesture) {
    const { dy, vy } = gesture;
    const isPress = Math.abs(dy) < 5;
    this.isPanning = false;

    // close when list is tapped and header is visible
    if (isPress && this.headerVisible()) {
      this.snapClosed(vy);
      return;
    }

    // animate the view open/closed
    if (this.isPanningDown()) this.snapOpen();
    else this.snapClosed();
  }

  /**
   * Sets the underlying 'base' Animated.Value.
   *
   * This wrapper functon allows us to keep track
   * of current and previous values before react-native
   * applies any offsets.
   *
   * @param {Number} baseY
   */
  setValue(baseY) {
    const previousBaseY = this.baseY;

    // only update the previous value if the new one
    // is different, so that we can track direction later
    if (baseY !== previousBaseY) {
      this.previousBaseY = previousBaseY;
    }

    this.baseY = baseY;
    this.state.listY.setValue(baseY);
  }

  /**
   * Set the 'offset' that gets applied
   * to the underlying base value.
   *
   * This wrapper function allows us to keep
   * track of the current offset.
   *
   * @param {Number} value
   */
  setOffset(value) {
    this.state.listY.setOffset(value);
    this.yOffset = value;
  }

  /**
   * Test if the header is at all visible.
   *
   * @return {Boolean}
   */
  headerVisible() {
    return this.clampedY > 0;
  }

  /**
   * Test if the last known movement was in
   * a downward direction.
   *
   * @return {Boolean}
   */
  isPanningDown() {
    return this.baseY > this.previousBaseY;
  }

  /**
   * Called when the `ListView` scrolls.
   *
   * Gives us an opportunity to store the
   * last known scroll position and close
   * the header should it happen to be open.
   *
   * @type {Object}
   */
  onScroll({ nativeEvent: { contentOffset } }) {
    this.scrollY = contentOffset.y;
    this.snapClosed();
  }

  /**
   * Set whether scrolling is enabled on the `ListView`.
   *
   * We do this via .setNativeProps() as it bypasses
   * the `.render()` loop, so a lot faster. Speed is
   * essential when toggling scrollability in panHandlers.
   *
   * @param {Boolean} scrollEnabled
   */
  setScrollEnabled(scrollEnabled) {
    this.refs.list.setNativeProps({ scrollEnabled });
    this.scrollEnabled = scrollEnabled;
  }

  /**
   * Snap the header open.
   */
  snapOpen() {
    if (this.clampedY === Header.HEIGHT) return;
    this.snap(Header.HEIGHT - this.yOffset);
  }

  /**
   * Snap the heaer closed.
   */
  snapClosed() {
    this.setScrollEnabled(true);
    if (this.clampedY === 0) return;
    this.snap(0 - this.yOffset);
  }

  /**
   * Snap the header to a specific value.
   *
   * @param {Number} toValue
   */
  snap(toValue) {
    Animated.spring(this.state.listY, {
      toValue,
      velocity: 20,
      overshootClamping: true,
      tension: 100,
      easing: Easing.inOut(Easing.quad),
    }).start();
  }

  /**
   * Clamps the given Y value between the upper
   * and lower bounds. Returns the clamped
   * value and the offset from the bounds.
   *
   * @param {Number} y
   */
  clamp(y) {
    if (y > Header.HEIGHT) return { value: Header.HEIGHT, offset: y - Header.HEIGHT };
    else if (y < 0) return { value: 0, offset: y };
    else return { value: y, offset: 0 };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItemsIfNeeded());
  }

  componentWillReceiveProps({ items }) {
    if (items !== this.props.items) this.onItemsChanged(items);
  }

  onItemsChanged(items) {
    this.dataSource = this.dataSource.cloneWithRows(items);
  }

  render() {
    return (
      <View style={styles.root}>
        <Animated.View
          style={{ opacity: this.opacity, transform: [{ scale: this.scale }] }}>
          <Header
            title="Home"
            action="Settings"
            navigator={this.navigator}
            onActionPress={this.onSettingsPress}/>
        </Animated.View>

        <Animated.View
          {...this.panHandlers}
          style={[styles.listContainer, { transform: [{ translateY: this.translateY }] }]}>
          {this.renderItems()}
        </Animated.View>
      </View>
    );
  }

  renderItems() {
    const { itemsStatus } = this.props;

    switch (itemsStatus) {
      case EMPTY: return;
      case FETCHING: return this.renderItemsFetching();
      case ERRORED: return this.renderItemsErrored();
      case FETCHED: return this.renderList();
    }
  }

  renderItemsFetching() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.loading]} size="large"/>
    );
  }

  renderList() {
    return (
      <ListView
        ref="list"
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        scrollEnabled={this.scrollEnabled}
        bounces={false}
        style={[styles.list]}>
      </ListView>
    );
  }

  renderRow({ value: { id, imageUri } }) {
    return (
      <TouchableHighlight
        key={id}
        style={styles.row}
        onPress={() => this.onItemPress(id)}>
        <Image
          source={{ uri: imageUri }}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.topBar}>
            <Profile
              name="Dan Kitchener"
              source={require('../images/dummy/dank.jpg')}
              subtitle={`${Math.round(Math.random() * 15)} days ago`}
              style={styles.profile}/>
            <Star
              value={false}
              onValueChange={() => {}}/>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }

  renderItemsErrored() {
    return <Text>Something went wrong :(</Text>;
  }

  onItemPress(itemId) {
    this.navigator.push({
      id: 'item',
      data: { itemId },
    });
  }

  onSettingsPress() {
    this.navigator.push({ id: 'settings' });
  }
}

Home.propTypes = {
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
  items: PropTypes.array,
  itemsStatus: PropTypes.string,
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },

  listContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },

  row: {
    height: 400,
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
  },

  topBar: {
    flexDirection: 'row',
    margin: 10,
  },

  profile: {
    flex: 1,
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

const mapStateToProps = ({ items, itemsCache }) => {
  const itemIds = items.value || [];

  // filtered list of items that have been fetched
  const fetchedItems = itemIds
    .filter((itemId) => !!itemsCache[itemId])
    .map((itemId) => itemsCache[itemId]);

  return {
    items: fetchedItems,
    itemsStatus: items.status,
  };
};

export default connect(mapStateToProps)(Home);
