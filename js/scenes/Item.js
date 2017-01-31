import React, { Component, PropTypes } from 'react';
import { fetchItemIfNeeded } from '../store/actions';
import SocialShare from '../components/SocialShare';
import MagnetMap from '../components/MagnetMap';
import Header from '../components/Header';
import Star from '../components/Star';
import { connect } from 'react-redux';

import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  ActivityIndicator,
} from 'react-native';

import {
  FETCHING,
} from '../store/constants';

const FOOTER_HEIGHT = 80;

class Item extends Component {
  constructor(props) {
    super(props);
    const { height } = Dimensions.get('window');
    this.navigator = this.props.navigator;
    this.minY = -(height - FOOTER_HEIGHT);

    this.y = 0;
    this.previousY = 0;

    this.state = {
      panY: new Animated.Value(0),
    };

    this.translateY = this.state.panY.interpolate({
      inputRange: [this.minY, 0],
      outputRange: [this.minY, 0],
      extrapolate: 'clamp',
    });

    this.onPanYChange = this.onPanYChange.bind(this);
  }

  componentWillMount() {
    this.state.panY.addListener(this.onPanYChange);
    this.panHandlers = this.createPanHander();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps({ itemId }) {
    if (itemId !== this.props.itemId) this.fetchData();
  }

  fetchData() {
    const { dispatch, itemId } = this.props;
    dispatch(fetchItemIfNeeded(itemId));
  }

  render() {
    return (
      <View style={styles.root}>
        <Animated.View
          style={[styles.topLayer, { transform: [{ translateY: this.translateY }] }]}
          {...this.panHandlers}>
          <Header
            title="Item"
            navigator={this.navigator}
            style={styles.header}/>
          {this.renderBackground()}
          {this.renderContent()}
        </Animated.View>
        <View style={styles.bottomLayer}>
          {this.renderMap()}
        </View>

      </View>
    );
  }

  renderBackground() {
    if (!this.dataReady()) return;
    const { value: { imageUri } } = this.props.item;
    return <Image
      source={{ uri: imageUri }}
      style={styles.image}/>;
  }

  renderContent() {
    if (!this.dataReady()) return this.renderContentLoading();

    return (
      <View style={styles.content}>
        <View style={styles.topBar}>
          <SocialShare
            message={'Shared from magnet!'}
            url={'https://trymagnet.org/'}
            style={styles.social}/>
          <Star
            value={false}
            onValueChange={() => {}}
            style={styles.star}/>
        </View>
      </View>
    );
  }

  renderMap() {
    if (!this.dataReady()) return;

    const {
      value: {
        imageUri,
        latitude,
        longitude,
      },
    } = this.props.item;

    return (
      <MagnetMap
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0321,
        }}>
        <MagnetMap.Marker
          source={{ uri: imageUri }}
          coordinate={{
            latitude,
            longitude,
          }}/>
      </MagnetMap>
    );
  }

  renderContentLoading() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.loading]} size="large"/>
    );
  }

  createPanHander() {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (evt, { dy }) => {
        const substantialVerticalPan = Math.abs(dy) >= 20;
        const shouldPan = this.dataReady() && substantialVerticalPan;
        return shouldPan;
      },

      onPanResponderGrant: () => {
        this.state.panY.extractOffset();
      },

      onPanResponderMove: (evt, { dy }) => {
        this.state.panY.setValue(dy);
      },

      onPanResponderRelease: (evt, { dy }) => {
        this.state.panY.flattenOffset();
        this.snapAnimate(dy);
      },
    }).panHandlers;
  }

  onPanYChange({ value }) {
    const previousY = this.y;
    const y = value;

    if (previousY !== y) {
      this.previousY = previousY;
    }

    this.y = y;
  }

  snapAnimate() {
    const snapClosed = this.y < this.previousY;
    const toValue = snapClosed ? this.minY : 0;
    Animated.spring(this.state.panY, {
      toValue,
      velocity: 10,
    }).start();
  }

  dataReady() {
    const { item } = this.props;
    return item && item.status !== FETCHING;
  }
}

Item.propTypes = {
  itemId: PropTypes.number,
  item: PropTypes.object,
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },

  header: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  content: {
    flex: 1,
    position: 'relative',
  },

  topLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    flex: 1,
    backgroundColor: '#222',

    // shadow android
    elevation: 4,

    // shadow ios
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    flex: 1,
    opacity: 0.6,
    width: null,
    height: null,
    resizeMode: 'cover',
  },

  topBar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  social: {
    marginRight: 10,
  },

  star: {
    flexDirection: 'row',
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  bottomLayer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

const mapStateToProps = ({ itemsCache }, { itemId }) => {
  return {
    item: itemsCache[itemId],
  };
};


export default connect(mapStateToProps)(Item);
