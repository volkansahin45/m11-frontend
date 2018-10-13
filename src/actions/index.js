import api from "../data/api";

export const GET_MOST_SCANNED_PRODUCTS_START = 'GET_MOST_SCANNED_PRODUCTS_START';
export const GET_MOST_SCANNED_PRODUCTS_SUCCESS = 'GET_MOST_SCANNED_PRODUCTS_SUCCESS';
export const GET_MOST_SCANNED_PRODUCTS_FAIL = 'GET_MOST_SCANNED_PRODUCTS_FAIL';

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
  }).catch((error) => {
    console.log("error: ", error)
    dispatch({
      type: GET_MOST_SCANNED_PRODUCTS_FAIL,
      error
    });
  });
};
