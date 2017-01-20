import React, { Component, PropTypes } from 'react';
import { fetchItemIfNeeded } from '../store/actions';
import { defaultTextStyle } from '../../config';
import Header from '../components/Header';
import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
} from 'react-native';

export class Item extends Component {
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
    console.log('XXX', itemId);
    // dispatch(fetchItemIfNeeded());
  }

  render() {
    return (
      <View>
        <Header
          title="Item"
          navigator={this.navigator}/>
      </View>
    );
  }
}

Item.propTypes = {
  itemId: PropTypes.string,
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  text: {
    ...defaultTextStyle,
  },
});

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Item);
