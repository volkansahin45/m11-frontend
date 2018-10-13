import { Map } from 'immutable';

import {
  GET_MOST_SCANNED_PRODUCTS_START,
  GET_MOST_SCANNED_PRODUCTS_SUCCESS,
  GET_MOST_SCANNED_PRODUCTS_FAILED,
  GET_PRODUCT_BY_BARCODE_START,
  GET_PRODUCT_BY_BARCODE_SUCCESS,
  GET_PRODUCT_BY_BARCODE_FAILED
} from '../actions/index';

const initialState = Map({
  loading: false,
  failed: false,
  mostScannedProducts: null
});

const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOST_SCANNED_PRODUCTS_START:
      return state
        .set('loading', true)
        .set('failed', null)

    case GET_MOST_SCANNED_PRODUCTS_SUCCESS:
      return state
        .set('loading', false)
        .set("mostScannedProducts", action.data)
        .set('failed', null);

    case GET_MOST_SCANNED_PRODUCTS_FAILED:
      return state
        .set('loading', false)
        .set('failed', );

    case GET_PRODUCT_BY_BARCODE_START:
      return state
        .set('loading', true)
        .set('failed', false)

    case GET_PRODUCT_BY_BARCODE_SUCCESS:
      return state
        .set('loading', false)
        .set('failed', false);

    case GET_PRODUCT_BY_BARCODE_FAILED:
      return state
        .set('loading', false)
        .set('failed', true);

    default:
      return state;
  }
};

export default products;
