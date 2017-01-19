
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
  ScrollView,
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
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItemsIfNeeded());
  }

  onMapPress() {
    this.navigator.push({ id: 'map' });
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <Header title="Home"/>
        {this.renderItems(this.props.items)}
      </ScrollView>
    );
  }

  renderItems({ status, value }) {
    switch (status) {
      case FETCHING: return this.renderItemsFetching();
      case FETCHED: return this.renderItemsFetched(value);
      case ERRORED: return this.renderItemsErrored();
      case EMPTY: return;
    }
  }

  renderItemsFetching() {
    return <ActivityIndicator
      animating={true}
      style={[styles.centering, {height: 80}]} size="large" />;
  }

  renderItemsFetched(items) {
    return items.map(({ id, image }) => {
      return <View
        key={id}
        style={styles.item}>
        <Image
          source={{ uri: image }}
          resizeMode={Image.resizeMode.cover}
          style={styles.image}/>
      </View>;
    });
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

  item: {
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
