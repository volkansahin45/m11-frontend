import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

import { connect } from "react-redux";

import { getProductPricesByBarcode } from "../actions/product";
import { addProductToBasket } from "../actions/basket";

import ProductView from "../components/productView";
import WaitingIndicator from "../components/waitingIndicator";
import Basket from "../components/basket";
import basketicon from "../../assets/basketicon.png";

class ProductDetailPage extends React.Component {
  static navigationOptions = {
    headerTitle: "Alternative Prices"
  };

  componentDidMount() {
    const { navigation } = this.props;
    const barcode = navigation.getParam("barcode", null);
    this.props.getProductPricesByBarcode(barcode);
  }

  renderLoadingIndicator = () => <WaitingIndicator />;

  renderError = () => (
    <View style={{ flex: 1 }}>
      <Text>Problem</Text>
    </View>
  );

  renderItem = item => {
    return <ProductView product={item.item} />;
  };

  render() {
    const { productAlternatives } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={item => "" + item.Id}
          data={productAlternatives}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.addProductToBasket(item)}
            >
              <View style={styles.containerStyle}>
                <Text style={{ flex: 1, fontSize: 20 }}>
                  {item.Supplier.Name} ({item.Price} TL)
                </Text>
                <Image style={{ width: 30, height: 30 }} source={basketicon} />
              </View>
            </TouchableOpacity>
          )}
        />
        <Basket onClick={() => this.props.navigation.navigate("BasketPage")} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.products.get("loading"),
  failed: state.products.get("failed"),
  productAlternatives: state.products.get("productAlternatives")
});

const mapDispatchToProps = {
  getProductPricesByBarcode,
  addProductToBasket
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    padding: 10,
    backgroundColor: "white"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailPage);
