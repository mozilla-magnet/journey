import { fetchItemsIfNeeded } from '../store/actions';
import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  FETCHED,
  FETCHING,
  ERRORED,
  EMPTY,
} from '../store/constants';

import ListItem from '../components/ListItem';

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
        renderRow={this.renderRow}>
      </ListView>
    );
  }

  renderRow({ value: { id, imageUri, createdByUser } }) {
    const userImageUri = createdByUser.imageUri;

    return (
      <ListItem
        key={id}

        onPress={() => this.onItemPress(id)}
        imageUri={imageUri}

        name="Dan Kitchener"
        userImageUri={userImageUri}
        profileSubtitle={`${Math.round(Math.random() * 15)} days ago`}

        StarValue={false}
        StarOnValueChange={() => {}}/>
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
