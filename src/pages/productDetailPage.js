import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Picker
} from "react-native";

import { connect } from "react-redux";

import { getProductPricesByBarcode, listSuppliers } from "../actions/product";
import { addProductToBasket } from "../actions/basket";

import ProductView from "../components/productView";
import WaitingIndicator from "../components/waitingIndicator";
import Basket from "../components/basket";
import basketicon from "../../assets/basketicon.png";
import Modal from "react-native-modal";
import api from "../data/api";

class ProductDetailPage extends React.Component {
  static navigationOptions = {
    headerTitle: "Alternative Prices"
  };

  constructor(props) {
    super(props);
    this.state = {
      showAddPriceModal: false,
      price: "55",
      selectedSupplierId: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const barcode = navigation.getParam("barcode", null);
    this.props.getProductPricesByBarcode(barcode);
    this.props.listSuppliers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suppliers.length !== this.props.suppliers.length) {
      this.setState({ selectedSupplierId: nextProps.suppliers[0].Id });
    }
  }

  renderLoadingIndicator = () => <WaitingIndicator />;

  renderError = () => (
    <View style={{ flex: 1 }}>
      <Text>Problem</Text>
    </View>
  );

  addPrice() {
    const data = {
      SupplierId: this.state.selectedSupplierId,
      Price: this.state.price,
      ProductId: this.props.productAlternatives[0].Product.Id
    };

    api.insertProductPrice(data).then(r => {
      const { navigation } = this.props;
      const barcode = navigation.getParam("barcode", null);
      this.props.getProductPricesByBarcode(barcode);
      this.props.listSuppliers();
    });
  }

  render() {
    const { productAlternatives } = this.props;
    return (
      <View style={{ flex: 1, padding: 10 }}>
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
        <TouchableOpacity
          onPress={() => this.setState({ showAddPriceModal: true })}
        >
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue"
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Fiyat Ekle
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.showAddPriceModal}
          backdropColor={"#CCCCCC"}
          backdropOpacity={0.5}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
          onBackdropPress={() => {
            this.setState({ showAddPriceModal: false });
          }}
        >
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: "bold" }}>Supplier</Text>
            <Picker
              selectedValue={this.state.selectedSupplierId}
              style={{ height: 50 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedSupplierId: itemValue })
              }
            >
              {this.props.suppliers.map(r => (
                <Picker.Item label={r.Name} value={r.Id} key={"" + r.Id} />
              ))}
            </Picker>
            <Text style={{ fontWeight: "bold" }}>Price</Text>
            <TextInput
              keyboardType="numeric"
              style={{
                height: 40,
                backgroundColor: "#fff",
                padding: 5,
                marginBottom: 10
              }}
              onChangeText={price => this.setState({ price })}
              value={this.state.price}
              underlineColorAndroid="#CCCCCC"
              placeholder="Price"
            />
            <TouchableOpacity onPress={() => this.addPrice()}>
              <View
                style={{
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "blue"
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Fiyatı Ekle
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.products.get("loading"),
  failed: state.products.get("failed"),
  productAlternatives: state.products.get("productAlternatives"),
  suppliers: state.products.get("suppliers")
});

const mapDispatchToProps = {
  getProductPricesByBarcode,
  addProductToBasket,
  listSuppliers
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 2,
    padding: 10,
    backgroundColor: "white"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailPage);
