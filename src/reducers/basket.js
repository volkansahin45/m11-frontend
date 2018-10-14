import { Map } from "immutable";
import { ADD_PRODUCT_TO_BASKET } from "../actions/basket";

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
      return state.set("basket", data);
    default:
      return state;
  }
};

export default basket;
