import { fetchItemsIfNeeded } from '../store/actions';
import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import {
  FETCHED,
  FETCHING,
  ERRORED,
  EMPTY,
} from '../store/constants';

import Star from '../components/Star';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;

    // never bind functions in render(), it
    // messes with react's diffing logic
    this.onSettingsPress = this.onSettingsPress.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
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
        <Header
          title="Home"
          action="Settings"
          navigator={this.navigator}
          onActionPress={this.onSettingsPress}/>
        {this.renderItems()}
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
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={styles.list}>
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
          <Star
            value={false}
            onValueChange={() => {}}
            style={styles.star}/>
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
    flex: 1,
  },

  row: {
    height: 300,
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'flex-end',
  },

  star: {
    margin: 10,
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
