import React from "react";
import {
  FlatList,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";

import { getMostScannedProducts } from "../actions/index";

import ProductView from "../components/productView";


class ProductListPage extends React.Component {
  static navigationOptions = {
    headerTitle: "Ürünlere Göz At"
  }

  async componentWillMount() {
    this.props.getMostScannedProducts();
  }

  onClickProduct = () => {
    alert("onClickProduct");
  }

  renderItem = (item) => {
    return (
      <ProductView 
        product={item.item}
        onClick={this.onClickProduct}/>
    );
  }

  render() {

    console.log("data: ", this.props.products)
    return (
        <FlatList
          keyExtractor={(item) => item.id + ""}
          data={this.props.products}
          renderItem={this.renderItem}
        />
    );
  }
}

const styles = StyleSheet.create({
})

const mapStateToProps = state => ({
  products: state.products.get("mostScannedProducts")
});

const mapDispatchToProps = {
  getMostScannedProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
