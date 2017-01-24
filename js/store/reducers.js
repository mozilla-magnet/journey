import {
  EMPTY,
  FETCHING,
  FETCHED,
  LOCATION_ACQUIRING,
  LOCATION_ERRORED,
  LOCATION_ACQUIRED,
} from './constants';

const initialState = {
  items: {
    status: EMPTY,
    timestamp: null,
    value: null,
  },
  location: {
    status: EMPTY,
    value: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_FETCHING': return itemsFetching(state, action);
    case 'ITEMS_FETCHED': return itemsFetched(state, action);
    case 'LOCATION_ACQUIRING': return locationAcquiring(state, action);
    case 'LOCATION_ACQUIRED': return locationAcquired(state, action);
    case 'LOCATION_ERRORED': return locationErrored(state, action);
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
      value,
    },
  };
}

function locationAcquiring(state) {
  return {
    ... state,
    location: {
      status: LOCATION_ACQUIRING,
      value: null,
    },
  };
}

function locationAcquired(state, { value }) {
  return {
    ... state,
    location: {
      status: LOCATION_ACQUIRED,
      value,
    },
  };
}

function locationErrored(state) {
  return {
    ... state,
    location: {
      status: LOCATION_ERRORED,
      value: null,
    },
  };
}
