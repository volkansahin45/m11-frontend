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
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import {
  removeProductFromBasket,
  getCalculatedPriceForBasket
} from "../actions/basket";
import { BASE_URL } from "../data/api";

class BasketPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Basket"
    };
  };

  render() {
    const basket = this.props.basket;
    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View>
          <FlatList
            keyExtractor={item => "" + item.Id}
            data={basket}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.itemContainer}>
                  {item.ImageUrl && (
                    <Image
                      style={{ width: 30, height: 30, marginRight: 5 }}
                      source={{
                        uri: BASE_URL + "/images/" + item.ImageUrl
                      }}
                    />
                  )}
                  <Text style={{ flex: 1, fontSize: 20 }}>{item.Name}</Text>
                  <TouchableOpacity
                    onPress={() => this.props.removeProductFromBasket(item)}
                  >
                    <Ionicons
                      name="ios-close-circle-outline"
                      style={{ color: "#ff0000", fontSize: 22 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("CalculatedPricesPage")
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              padding: 5,
              marginTop: 10
            }}
          >
            <Ionicons
              name="ios-color-wand"
              style={{ color: "green", fontSize: 26, marginRight: 10 }}
            />
            <Text style={{ color: "green", fontSize: 22 }}>Teklifleri Al</Text>
          </TouchableOpacity>
        </View>
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
  }
});

const mapStateToProps = state => ({
  basket: state.basket.get("basket")
});

const mapDispatchToProps = {
  removeProductFromBasket,
  getCalculatedPriceForBasket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketPage);
