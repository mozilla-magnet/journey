
import { fetchItemsIfNeeded } from '../store/actions';
import React, { Component, PropTypes } from 'react';
import { defaultTextStyle } from '../../config';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ListView,
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

  onItemsChanged({ value }) {
    this.dataSource = this.dataSource.cloneWithRows(value || []);
  }

  onMapPress() {
    this.navigator.push({ id: 'map' });
  }

  render() {
    return (
      <View style={styles.root}>
        <Header
          title="Home"
          action="Settings"
          navigator={this.navigator}
          onActionPress={this.onSettingsPress}/>
        {this.renderItems(this.props.items)}
      </View>
    );
  }

  onSettingsPress() {
    this.navigator.push({ id: 'settings' });
  }

  renderItems({ status }) {
    switch (status) {
      case EMPTY: return;
      case FETCHING: return this.renderItemsFetching();
      case ERRORED: return this.renderItemsErrored();
      case FETCHED: return this.renderList();
    }
  }

  renderItemsFetching() {
    return <ActivityIndicator
      animating={true}
      style={[styles.centering, {height: 80}]} size="large" />;
  }

  renderList() {
    return <ListView
      dataSource={this.dataSource}
      renderRow={this.renderRow}
      style={styles.list}>
    </ListView>;
  }

  renderRow({ id, image }) {
    return <View
      key={id}
      style={styles.row}>
      <Image
        source={{ uri: image }}
        resizeMode={Image.resizeMode.cover}
        style={styles.image}/>
    </View>;
  }

  renderItemsErrored() {
    return <Text>Something went wrong :(</Text>;
  }
}

Home.propTypes = {
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
  items: PropTypes.object,
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

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

const mapStateToProps = ({ items }) => {
  return {
    items,
  };
};

export default connect(mapStateToProps)(Home);
