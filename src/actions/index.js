import api from "../data/api";

export const GET_MOST_SCANNED_PRODUCTS_START = 'GET_MOST_SCANNED_PRODUCTS_START';
export const GET_MOST_SCANNED_PRODUCTS_SUCCESS = 'GET_MOST_SCANNED_PRODUCTS_SUCCESS';
export const GET_MOST_SCANNED_PRODUCTS_FAILED = 'GET_MOST_SCANNED_PRODUCTS_FAIL';

export const GET_PRODUCT_BY_BARCODE_START = 'GET_PRODUCT_BY_BARCODE_START';
export const GET_PRODUCT_BY_BARCODE_SUCCESS = 'GET_PRODUCT_BY_BARCODE_SUCCESS';
export const GET_PRODUCT_BY_BARCODE_FAILED = 'GET_PRODUCT_BY_BARCODE_FAIL';

export const getMostScannedProducts = () => (dispatch) => {
  dispatch({
    type: GET_MOST_SCANNED_PRODUCTS_START,
  });
  return api.getMostScannedProducts()
    .then((responseJson) => {
    dispatch({
      type: GET_MOST_SCANNED_PRODUCTS_SUCCESS,
      data: responseJson,
    });
    return responseJson;
  }).catch((error) => {
    console.log("error: ", error)
    dispatch({
      type: GET_MOST_SCANNED_PRODUCTS_FAILED,
      error
    });
  });
};

export const getProductPricesByBarcode = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_BY_BARCODE_START,
  });
  return api.getProductPricesByBarcode()
    .then((responseJson) => {
    dispatch({
      type: GET_PRODUCT_BY_BARCODE_SUCCESS,
      data: responseJson,
    });
    return responseJson;
  }).catch((error) => {
    console.log("error: ", error)
    dispatch({
      type: GET_PRODUCT_BY_BARCODE_FAILED,
      error
    });
  });
};
