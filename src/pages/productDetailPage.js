import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  ActivityIndicator
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { connect } from "react-redux";
import { getProductPricesByBarcode, listSuppliers } from "../actions/product";
import { addProductToBasket } from "../actions/basket";
import Basket from "../components/basket";
import basketicon from "../../assets/basketicon.png";
import Modal from "react-native-modal";
import api, {BASE_URL} from "../data/api";
import _ from "lodash";

class ProductDetailPage extends React.Component {
  static navigationOptions = {
    headerTitle: "Alternative Prices"
  };

  constructor(props) {
    super(props);
    this.state = {
      showAddPriceModal: false,
      price: "55",
      name: "",
      selectedSupplierId: null,
      photoSource: null
    };
  }

  componentDidMount() {
    this.getAlternatives();
  }

  getAlternatives() {
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

  addPrice() {
    const data = {
      SupplierId: this.state.selectedSupplierId,
      Price: this.state.price,
      ProductId: this.props.productAlternatives[0].Product.Id
    };

    api.insertProductPrice(data).then(r => {
      this.getAlternatives();
    });
  }

  renderProductAlternatives() {
    const { productAlternatives } = this.props;
    return (
      <FlatList
        keyExtractor={item => "" + item.Id}
        data={productAlternatives}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.addProductToBasket(item)}>
            <View style={styles.containerStyle}>
              <Text style={{ flex: 1, fontSize: 20 }}>
                {item.Supplier.Name} ({item.Price} TL)
              </Text>
              <Image style={{ width: 30, height: 30 }} source={basketicon} />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  _handleImagePicked = async () => {
    const { navigation } = this.props;
    const barcode = navigation.getParam("barcode", null);

    let uri = this.state.photoSource;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();

    formData.append("productImage", {
      uri,
      name: `photo-${_.random(0, 100)}.${fileType}`,
      type: `image/${fileType}`
    });

    formData.append("productId", barcode);
    formData.append("price", this.state.price);
    formData.append("supplierId", this.state.selectedSupplierId);
    formData.append("productName", this.state.name);

    api
      .insertProduct(formData)
      .then(r => {
        this.getAlternatives();
      })
      .catch(r => {
        console.log(r);
      });
  };

  renderNewProductForm() {
    return (
      <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            color: "green",
            fontSize: 20
          }}
        >
          No alternative prices found for this barcode, You can add one!
        </Text>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "#fff",
            padding: 5,
            marginBottom: 10
          }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
          underlineColorAndroid="#CCCCCC"
          placeholder="Name"
        />
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
          onChangeText={price => {
            this.setState({ price });
          }}
          value={this.state.price}
          underlineColorAndroid="#CCCCCC"
          placeholder="Price"
        />
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "#CCCCCC" }}
          onPress={async () => {
            const { status: cameraPerm } = await Permissions.askAsync(
              Permissions.CAMERA
            );

            const { status: cameraRollPerm } = await Permissions.askAsync(
              Permissions.CAMERA_ROLL
            );

            let pickerResult = await ImagePicker.launchCameraAsync({
              allowsEditing: false,
              aspect: [4, 3]
            });
            this.setState({ photoSource: pickerResult.uri });
          }}
        >
          <View>
            <Text>Select Photo</Text>
          </View>
        </TouchableOpacity>
        {this.state.photoSource && (
          <Image
            style={{ width: 100, height: 100, marginTop: 5 }}
            source={{ uri: this.state.photoSource }}
          />
        )}
        <TouchableOpacity
          onPress={async () => {
            this._handleImagePicked();
          }}
        >
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
              marginTop: 5
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Fiyatı Ekle
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { productAlternatives, productAlternativesLoading } = this.props;
    if (productAlternativesLoading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1, padding: 10 }}>
        {productAlternatives.length > 0
          ? this.renderProductAlternatives()
          : this.renderNewProductForm()}
        <Basket onClick={() => this.props.navigation.navigate("BasketPage")} />
        {productAlternatives.length > 0 && (
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
        )}
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
  productAlternativesLoading: state.products.get("productAlternativesLoading"),
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
