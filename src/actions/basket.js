export const ADD_PRODUCT_TO_BASKET = "ADD_PRODUCT_TO_BASKET";

export const addProductToBasket = barcode => dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    data: barcode
  });
};