import { fetchItemsIfNeeded } from '../store/actions';
import React, { Component, PropTypes } from 'react';
import { defaultTextStyle } from '../../config';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  TouchableOpacity,
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
    console.log('on items changed', items);
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

  onSettingsPress() {
    this.navigator.push({ id: 'settings' });
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
        style={[styles.loading]} size="large" />
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

  renderRow({ value: {id, image} }) {
    console.log('render row', id, image);
    return (
      <TouchableOpacity
        key={id}
        style={styles.row}
        onPress={() => this.onItemPress(id) }>
        <Image
          source={{ uri: image }}
          resizeMode={Image.resizeMode.cover}
          style={styles.image}/>
      </TouchableOpacity>
    );
  }

  renderItemsErrored() {
    return <Text>Something went wrong :(</Text>;
  }

  onItemPress(id) {
    this.navigator.push({
      id: 'item',
      data: { itemId: id },
    });
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

  list: {

  },

  row: {
    height: 300,
    flexDirection: 'row',
  },

  image: {
    flex: 1,
    width: null,
    height: null,
  },

  text: {
    ...defaultTextStyle,
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

const mapStateToProps = ({ items, itemsCache }) => {
  const itemIds = items.value || [];

  // create a list of fetched/inflated items
  const fetchedItems = itemIds.reduce((result, id) => {
    const item = itemsCache[id];
    if (item) result.push(item);
    return result;
  }, []);

  return {
    items: fetchedItems,
    itemsStatus: items.status,
  };
};

export default connect(mapStateToProps)(Home);
