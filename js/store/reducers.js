import {
  EMPTY,
  FETCHING,
  FETCHED,
} from './constants';

const initialState = {
  items: {
    status: EMPTY,
    timestamp: null,
    value: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_FETCHING': return itemsFetching(state, action);
    case 'ITEMS_FETCHED': return itemsFetched(state, action);
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
