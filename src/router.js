import { createStackNavigator } from "react-navigation";

import Home from "./pages/homePage";
import ProductDetailPage from "./pages/productDetailPage";
import ProductListPage from "./pages/productListPage";
import BasketPage from "./pages/BasketPage";
import CalculatedPricesPage from "./pages/CalculatedPricesPage";

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    ProductDetailPage: {
      screen: ProductDetailPage
    },
    ProductListPage: {
      screen: ProductListPage
    },
    BasketPage: {
      screen: BasketPage
    },
    CalculatedPricesPage: {
      screen: CalculatedPricesPage
    }
  },
  {
    initialRouteName: "Home"
  }
);
