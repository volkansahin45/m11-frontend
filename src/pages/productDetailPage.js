import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList
} from "react-native";

import { connect } from "react-redux";

import { getProductPricesByBarcode } from "../actions/index";

import ProductView from "../components/productView";
import WaitingIndicator from "../components/waitingIndicator"

class ProductDetailPage extends React.Component {
  static navigationOptions = {
    headerTitle: "Detail"
  }

  state= {
    products: null
  }

  async componentWillMount(){
    const { navigation } = this.props;
    const barcode = navigation.getParam('barcode', null);

    this.props.getProductPricesByBarcode(barcode)
    .then((response) => {
      this.setState({
        products: response
      })
    }).catch((error) => {
    });;
  }

  renderLoadingIndicator = () => (
    <WaitingIndicator />
  )

  renderError = () => (
    <View style={{flex: 1}}>
      <Text>Problem</Text>
    </View>
  )

  renderView = () => (
    <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id + ""}
          data={this.state.products}
          renderItem={this.renderItem}
        />
    </View>
  )
  
  renderItem = (item) => {
    return (
      <ProductView product={item.item}/>
    );
  }

  render() {
    const { loading, failed } = this.props;

    if(loading){
      return this.renderLoadingIndicator();
    }

    return failed ? this.renderError() : this.renderView();
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignSelf: "center"
  }
})

const mapStateToProps = state => ({
  loading: state.products.get("loading"),
  failed: state.products.get("failed")
});

const mapDispatchToProps = {
  getProductPricesByBarcode
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
