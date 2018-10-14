import api from "../data/api";

export const GET_PRODUCTS_START = "GET_PRODUCTS_START";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILED = "GET_PRODUCTS_FAIL";

export const GET_PRODUCT_BY_BARCODE_START = "GET_PRODUCT_BY_BARCODE_START";
export const GET_PRODUCT_BY_BARCODE_SUCCESS = "GET_PRODUCT_BY_BARCODE_SUCCESS";
export const GET_PRODUCT_BY_BARCODE_FAILED = "GET_PRODUCT_BY_BARCODE_FAIL";

export const LIST_SUPPLIERS = "LIST_SUPPLIERS";

export const getProducts = keyword => dispatch => {
  dispatch({
    type: GET_PRODUCTS_START
  });
  return api
    .getProducts(keyword)
    .then(responseJson => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        data: responseJson
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PRODUCTS_FAILED,
        error
      });
    });
};

export const getProductPricesByBarcode = barcode => dispatch => {
  dispatch({
    type: GET_PRODUCT_BY_BARCODE_START
  });
  return api
    .getProductPricesByBarcode(barcode)
    .then(responseJson => {
      dispatch({
        type: GET_PRODUCT_BY_BARCODE_SUCCESS,
        data: responseJson
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PRODUCT_BY_BARCODE_FAILED,
        error
      });
    });
};

export const listSuppliers = () => dispatch => {
  return api.listSuppliers().then(responseJson => {
    dispatch({
      type: LIST_SUPPLIERS,
      data: responseJson
    });
  });
};
