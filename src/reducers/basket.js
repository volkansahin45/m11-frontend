import { Map } from 'immutable';

import { AsyncStorage } from "react-native";

import {
  SET_SAVED_BASKET_TO_STORE
  ,ADD_PRODUCT_TO_BASKET
} from '../actions/basket';

const initialState = Map({
  loading: false,
  failed: false,
  basket: []
});

const basket = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      var data = state.get("basket");
      data = data == null ? [] : data.slice();
      data.push(action.data);
      AsyncStorage.setItem("@basket", JSON.stringify(data));

      return state
        .set("basket", data)

    case SET_SAVED_BASKET_TO_STORE:
      return state
        .set("basket", action.data);

    default:
      return state;
  }
};

export default basket;
