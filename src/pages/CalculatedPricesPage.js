import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { getCalculatedPriceForBasket } from "../actions/basket";
import _ from 'lodash'

class CalculatedPricesPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Our Offers"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSupplier: {},
      showModal: false
    };
  }

  componentDidMount() {
    this.props.getCalculatedPriceForBasket(this.props.basket.map(r => r.Id));
  }

  render() {
    const calculatedPrices = _.sortBy(this.props.calculatedPrices, 'TotalPrice').reverse();
    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <FlatList
          keyExtractor={item => item.SupplierName}
          data={calculatedPrices}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectedSupplier: item, showModal: true })
              }
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 2,
                  padding: 10,
                  backgroundColor: "white"
                }}
              >
                <Text style={{ flex: 1, fontSize: 20 }}>
                  {item.SupplierName} ({item.ProductList.length} product
                  {item.ProductList.length > 1 && "s"})
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.TotalPrice} TL
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Modal
          isVisible={this.state.showModal}
          backdropColor={"#CCCCCC"}
          backdropOpacity={0.5}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
          onBackdropPress={() => {
            this.setState({ showModal: false });
          }}
        >
          <View style={styles.modalContent}>
            <FlatList
              keyExtractor={item => item.Product.Id}
              data={this.state.selectedSupplier.ProductList}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 2,
                    padding: 10,
                    backgroundColor: "white"
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 20 }}>
                    {item.Product.Name}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.Price} TL
                  </Text>
                </View>
              )}
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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

const mapStateToProps = state => ({
  basket: state.basket.get("basket"),
  calculatedPrices: state.basket.get("calculatedPrices")
});

const mapDispatchToProps = {
  getCalculatedPriceForBasket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatedPricesPage);
