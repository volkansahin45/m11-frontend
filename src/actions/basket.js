export const ADD_PRODUCT_TO_BASKET = "ADD_PRODUCT_TO_BASKET";
export const REMOVE_PRODUCT_FROM_BASKET = "REMOVE_PRODUCT_FROM_BASKET";

export const addProductToBasket = barcode => dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    data: barcode
  });
};

export const removeProductFromBasket = product => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_BASKET,
    data: product
  });
};