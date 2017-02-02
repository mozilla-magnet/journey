import React, { Component, PropTypes } from 'react';
import PagerIndicator from './MagnetPagerIndicator';
import ViewPager from 'react-native-viewpager';

import {
  StyleSheet,
} from 'react-native';

export default class MagnetPager extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    this.state = {
      dataSource: dataSource.cloneWithPages(props.pages),
    };
  }

  render() {
    const {
      locked = false,
    } = this.props;

    return (
      <ViewPager
        ref="pager"
        autoPlay={false}
        isLoop={false}
        locked={locked}
        dataSource={this.state.dataSource}
        renderPage={(render) => render()}
        renderPageIndicator={() => <PagerIndicator/>}
        style={styles.root}/>
    );
  }

  goToPage(index) {
    this.refs.pager.goToPage(index);
  }
}

MagnetPager.propTypes = {
  locked: PropTypes.bool,
  pages: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
