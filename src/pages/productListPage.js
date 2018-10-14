import React from "react";
import { FlatList, StyleSheet, View, TextInput, Text } from "react-native";

import { connect } from "react-redux";
import _ from "lodash";

import { getProducts } from "../actions/product";

import ProductView from "../components/productView";
import WaitingIndicator from "../components/waitingIndicator";
import Basket from "../components/basket";

class ProductListPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "See Products "
  });

  state = {
    keyword: ""
  };

  componentDidMount() {
    this.props.getProducts("");
  }

  onSearchInputChanged = keyword => {
    this.setState({ keyword });
    this.getProducts(keyword);
  };

  getProducts = _.debounce(keyword => {
    this.props.getProducts(keyword);
  }, 500);

  renderLoadingIndicator = () => <WaitingIndicator />;

  renderError = () => <Text>Problem</Text>;

  renderView = () => (
    <View style={{ flex: 1, padding: 10 }}>
      <Basket onClick={() => this.props.navigation.navigate("BasketPage")} />
      <TextInput
        underlineColorAndroid="#CCCCCC"
        style={{
          height: 40,
          backgroundColor: "#fff",
          padding: 5,
          marginBottom: 10
        }}
        onChangeText={this.onSearchInputChanged}
        value={this.state.keyword}
        placeholder="Ara"
      />
      {this.props.loading ? (
        this.renderLoadingIndicator()
      ) : (
        <FlatList
          keyExtractor={item => "" + item.Id}
          data={this.props.products}
          renderItem={({ item }) => (
            <ProductView product={item} onClick={() => {
              this.props.navigation.navigate('ProductDetailPage', { barcode: item.Id })
            }} />
          )}
        />
      )}
    </View>
  );

  render() {
    return this.props.failed ? this.renderError() : this.renderView();
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  loading: state.products.get("loading"),
  products: state.products.get("products"),
  failed: state.products.get("failed")
});

const mapDispatchToProps = {
  getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);
