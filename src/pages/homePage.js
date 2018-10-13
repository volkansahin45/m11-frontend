import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

import { connect } from 'react-redux';
import { SafeAreaView } from "react-navigation";
import { BarCodeScanner, Permissions } from 'expo';

import { getMostScannedProducts } from "../actions/index";

class Home extends React.Component {
  static navigationOptions = {
    headerTitle: "Home"
  };

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  onPressExploreButton = () => {
    this.props.navigation.navigate("ProductListPage");
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 1, justifyContent:"space-between" }}>
          <View style={{flex: 1}}>
            <BarCodeScanner
              onBarCodeScanned={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <Button
            title="Ürünlere Göz At"
            onPress={this.onPressExploreButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate("ProductDetailPage", { barcode: data });
  }

}

const styles = StyleSheet.create({
})

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  getMostScannedProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
