import {
  EMPTY,
  FETCHING,
  FETCHED,
  GEO_ADQUIRING,
  GEO_ERROR,
  GEO_ADQUIRED,
} from './constants';

const initialState = {
  items: {
    status: EMPTY,
    timestamp: null,
    value: null,
  },
  geolocation: {
    status: EMPTY,
    value: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_FETCHING': return itemsFetching(state, action);
    case 'ITEMS_FETCHED': return itemsFetched(state, action);
    case 'GEO_ADQUIRING': return geoAdquiring(state, action);
    case 'GEO_ADQUIRED': return geoAdquired(state, action);
    case 'GEO_ERROR': return geoError(state, action);
    default: return state;
  }
};

function itemsFetching(state) {
  return {
    ...state,
    items: {
      status: FETCHING,
      timestamp: Date.now(),
      value: null,
    },
  };
}

function itemsFetched(state, { value }) {
  return {
    ...state,
    items: {
      status: FETCHED,
      timestamp: Date.now(),
      value: value,
    },
  };
}

function geoAdquiring(state) {
  return {
    ... state,
    geolocation: {
      status: GEO_ADQUIRING,
      value: null,
    },
  };
}

function geoAdquired(state, { value }) {
  return {
    ... state,
    geolocation: {
      status: GEO_ADQUIRED,
      value: value,
    },
  };
}

function geoError(state) {
  return {
    ... state,
    geolocation: {
      status: GEO_ERROR,
      value: null,
    },
  };
}
