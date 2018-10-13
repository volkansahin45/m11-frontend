import { createStackNavigator} from "react-navigation"

import Home from "./pages/homePage"
import DetailPage from "./pages/productDetailPage"
import ProductListPage from "./pages/productListPage"

export default createStackNavigator({
    Home: {
      screen: Home,
    },
    DetailPage: {
      screen: DetailPage
    },
    ProductListPage: {
      screen: ProductListPage
    }
  }, {
      initialRouteName: 'Home',
  });