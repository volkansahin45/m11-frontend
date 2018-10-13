import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

import { connect } from 'react-redux';
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

  onPressLookUpButton = () => {
    this.props.navigation.navigate("ProductListPage")  
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
      <View style={{ flex: 1, justifyContent:"space-between" }}>
        <View style={{flex: 1}}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Button
          title="Ürünlere Göz At"
          onPress={this.onPressLookUpButton}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.navigate("ProductDetailPage");
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
