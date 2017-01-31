import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import MagnetMap from '../components/MagnetMap';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  FETCHED,
  FETCHING,
  ERRORED,
  EMPTY,
} from '../store/constants';

export class Map extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress() {
    this.navigator.pop();
  }

  render() {
    return (
      <View style={styles.root}>
        <Header
          title="Map"
          navigator={this.navigator}/>
        <View style={styles.content}>
          {this.renderContent()}
        </View>
      </View>
    );
  }

  renderContent() {
    switch (this.props.itemsStatus) {
      case EMPTY: return;
      case FETCHING: return this.renderItemsFetching();
      case ERRORED: return this.renderItemsErrored();
      case FETCHED: return this.renderMap();
    }
  }

  renderMap() {
    return (
      <MagnetMap
        region={{
          latitude: 51.504444,
          longitude: -0.086667,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0321,
        }}
        style={styles.map}>
        {this.renderMarkers()}
      </MagnetMap>
    );
  }

  renderMarkers() {
    const { fetchedItems } = this.props;
    return fetchedItems.map(({ value: { id, imageUri, latitude, longitude } }) => {
      return <MagnetMap.Marker
        key={id}
        id={id}
        source={{ uri: imageUri }}
        coordinate={{
          latitude,
          longitude,
        }}/>;
    });
  }
}

Map.propTypes = {
  navigator: PropTypes.object,
  fetchedItems: PropTypes.array,
  itemsStatus: PropTypes.string,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

const mapStateToProps = ({ items, itemsCache }) => {
  const itemIds = items.value || [];

  // filtered list of items that have been fetched
  const fetchedItems = itemIds
    .filter((itemId) => !!itemsCache[itemId])
    .map((itemId) => itemsCache[itemId]);

  return {
    fetchedItems,
    itemsStatus: items.status,
  };
};

export default connect(mapStateToProps)(Map);
