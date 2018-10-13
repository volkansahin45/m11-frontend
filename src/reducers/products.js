import { Map } from 'immutable';

import {
  GET_MOST_SCANNED_PRODUCTS_START,
  GET_MOST_SCANNED_PRODUCTS_SUCCESS,
  GET_MOST_SCANNED_PRODUCTS_FAIL
} from '../actions/index';

const initialState = Map({
  loading: false,
  error: false,
  mostScannedProducts: null
});

const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOST_SCANNED_PRODUCTS_START:
      return state
        .set('loading', true)
        .set('error', null)

    case GET_MOST_SCANNED_PRODUCTS_SUCCESS:
      return state
        .set('loading', false)
        .set("mostScannedProducts", action.data)
        .set('error', null);

    case GET_MOST_SCANNED_PRODUCTS_FAIL:
      return state
        .set('loading', false)
        .set('error', action.errorCode);

    default:
      return state;
  }
};

export default products;
