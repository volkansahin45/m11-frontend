import { createStackNavigator} from "react-navigation"

import Home from "./pages/homePage"
import ProductDetailPage from "./pages/productDetailPage"
import ProductListPage from "./pages/productListPage"

export default createStackNavigator({
    Home: {
      screen: Home,
    },
    ProductDetailPage: {
      screen: ProductDetailPage
    },
    ProductListPage: {
      screen: ProductListPage
    }
  }, {
      initialRouteName: 'Home',
  });