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
import { removeProductFromBasket } from "../actions/basket";

class BasketPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Basket"
    };
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View>
          <FlatList
            keyExtractor={item => item.Id}
            data={this.props.basket}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.itemContainer}>
                  <Text style={{ flex: 1, fontSize: 17 }}>{item.Name}</Text>
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
  removeProductFromBasket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketPage);
