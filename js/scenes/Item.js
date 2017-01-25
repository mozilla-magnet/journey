import React, { Component, PropTypes } from 'react';
import { fetchItemIfNeeded } from '../store/actions';
import { defaultTextStyle } from '../../config';
import Header from '../components/Header';
import { connect } from 'react-redux';
import SocialShare from '../components/SocialShare';

import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  FETCHING,
} from '../store/constants';

import Star from '../components/Star';

class Item extends Component {
  constructor(props) {
    super(props);
    this.navigator = this.props.navigator;
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
        <Header
          title="Item"
          navigator={this.navigator}
          style={styles.header}/>
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    const { item } = this.props;
    if (!item || item.status === FETCHING) return this.renderContentLoading();
    const { value: { imageUri } } = item;

    return (
      <Image
        source={{ uri: imageUri }}
        resizeMode="cover"
        style={styles.image}
        >
         <View style={{flex: 1, flexDirection: 'row', paddingTop: 60}}>
          <SocialShare
            message={ "Shared from magnet!" }
            url={ "https://trymagnet.org/" }
            style={{ margin: 10 }}
            />
          <Star
            value={false}
            onValueChange={() => {}}/>
         </View>
      </Image>
    );
  }

  renderContentLoading() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.loading]} size="large"/>
    );
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  text: {
    ...defaultTextStyle,
  },

  image: {
    flex: 1,
    opacity: 0.6,
    alignItems: 'flex-end',
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

const mapStateToProps = ({ itemsCache }, { itemId }) => {
  return {
    item: itemsCache[itemId],
  };
};

export default connect(mapStateToProps)(Item);
