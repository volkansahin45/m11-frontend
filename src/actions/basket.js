import { AsyncStorage } from "react-native"

export const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
export const SET_SAVED_BASKET_TO_STORE = 'GET_PRODUCTS_FROM_BASKET';

export const addProductToBasket = (barcode) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    data: barcode
  });
};

export const setSavedBasketToStore = (data) => (dispatch) => {
  AsyncStorage.getItem("@basket")
  .then((basket) => {
    dispatch({
      type: SET_SAVED_BASKET_TO_STORE,
      data: basket == null ? [] : JSON.parse(basket)
    });
  })
};

export const clean = () => (dispatch) =>{
  AsyncStorage.clear();
}