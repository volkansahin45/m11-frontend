import { Map } from "immutable";
import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET
} from "../actions/basket";

const initialState = Map({
  loading: false,
  failed: false,
  basket: []
});

const basket = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET: {
      const product = action.data;
      var data = state.get("basket");

      if (data.indexOf(product) > -1) {
        return state;
      }

      data = data == null ? [] : data.slice();
      data.push(product);
      return state.set("basket", data);
    }
    case REMOVE_PRODUCT_FROM_BASKET: {
      const product = action.data;
      var data = state.get("basket");
      data = data == null ? [] : data.slice();
      data = data.filter(r => r.Id !== product.Id);
      return state.set("basket", data);
    }
    default:
      return state;
  }
};

export default basket;
