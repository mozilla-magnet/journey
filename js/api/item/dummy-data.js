/* global require */

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const images =[
  resolveAssetSource(require('../../images/dummy/dank.jpg')),
  resolveAssetSource(require('../../images/dummy/lowbros.jpg')),
];

export default [
  {
    id: '202',
    user_id: '102',
    image: images[0].uri,
  },
  {
    id: '201',
    user_id: '101',
    image: images[1].uri,
  },
];
