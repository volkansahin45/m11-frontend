import { Map } from "immutable";

import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_BY_BARCODE_START,
  GET_PRODUCT_BY_BARCODE_SUCCESS,
  GET_PRODUCT_BY_BARCODE_FAILED,
  LIST_SUPPLIERS
} from "../actions/product";

const initialState = Map({
  loading: false,
  failed: false,
  products: [],
  productAlternatives: [],
  suppliers: []
});

const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
      return state
        .set("loading", true)
        .set("products", [])
        .set("failed", false);

    case GET_PRODUCTS_SUCCESS:
      return state
        .set("loading", false)
        .set("products", action.data)
        .set("failed", false);

    case GET_PRODUCTS_FAILED:
      return state
        .set("loading", false)
        .set("products", null)
        .set("failed", true);

    case GET_PRODUCT_BY_BARCODE_START:
      return state
        .set("loading", true)
        .set("productAlternatives", [])
        .set("failed", false);

    case GET_PRODUCT_BY_BARCODE_SUCCESS:
      return state
        .set("loading", false)
        .set("productAlternatives", action.data)
        .set("failed", false);

    case GET_PRODUCT_BY_BARCODE_FAILED:
      return state.set("loading", false).set("failed", true);

    case LIST_SUPPLIERS:
      return state.set("suppliers", action.data);

    default:
      return state;
  }
};

export default products;
