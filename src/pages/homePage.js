import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo";
import Basket from "../components/basket";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "M11",
      headerRight: (
        <TouchableOpacity
          underlayColor="#fff"
          onPress={() => navigation.navigate("ProductListPage")}
        >
          <Image
            source={require("../../assets/searchicon.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )
    };
  };

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onPressExploreButton = () => {
    this.props.navigation.navigate("ProductListPage");
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeScanned={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <TouchableOpacity onPress={this.onPressExploreButton}>
            <View
              style={{
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue"
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                See Products 
              </Text>
            </View>
          </TouchableOpacity>
          <Basket
            onClick={() => this.props.navigation.navigate("BasketPage")}
          />
        </View>
      </SafeAreaView>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate("ProductDetailPage", { barcode: data });
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
