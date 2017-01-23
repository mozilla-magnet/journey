import fetchItems from '../api/fetch-items';
import { geoWatch } from '../api/geolocation';

import {
  EMPTY,
  FETCHED,
  ERRORED,
} from './constants';

export const watchGeoLocation = () => {
  return (dispatch) => {
    dispatch(geoAdquiring);
    geoWatch((geo) => {
      dispatch(geoAdquired(geo));
    },() => {
      dispatch(geoError);
    });
  };
};

export const geoAdquiring = () => {
  return {
    type: 'GEO_ADQUIRING',
  };
};

export const geoAdquired = (value) => {
  return {
    type: 'GEO_ADQUIRED',
    value,
  };
};

export const geoError = () => {
  return {
    type: 'GEO_ERROR',
  };
};

export const dummyAction = (content) => {
  return {
    type: 'DUMMY_ACTION',
    content,
  };
};

export const fetchItemsIfNeeded = () => {
  return (dispatch, getState) => {
    if (!shouldFetchItems(getState())) return Promise.resolve();

    dispatch(itemsFetching());

    return fetchItems()
      .then((items) => {
        dispatch(itemsFetched(items));
      })

      .catch((e) => {
        dispatch(itemsFetchErrored(e));
      });
  };
};

export const itemsFetching = () => {
  return {
    type: 'ITEMS_FETCHING',
  };
};

export const itemsFetched = (value) => {
  return {
    type: 'ITEMS_FETCHED',
    value,
  };
};

export const itemsFetchErrored = (value) => {
  return {
    type: 'ITEMS_FETCH_ERRORED',
    value,
  };
};

/**
 * Items should only be fetched if:
 *  - empty
 *  - fetched
 *  - previous fetch errored
 *
 * @param  {Object} items
 * @return {Boolean}
 */
function shouldFetchItems({ items }) {
  switch (items.status) {
    case EMPTY:
    case FETCHED:
    case ERRORED:
      return true;
    default:
      return false;
  }
}
