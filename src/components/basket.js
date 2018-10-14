import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";

import basketicon from "../../assets/basketicon.png";

class Basket extends PureComponent {
  render() {
    const { basket, onClick } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onClick}>
        <ImageBackground source={basketicon} style={styles.imageBackground}>
          <View style={styles.textWrapper}>
            <Text style={{ fontWeight: "bold" }}>{basket.length}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 99,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderColor: '#CCCCCC',
    borderWidth: 1
  },
  imageBackground: {
    width: 50,
    height: 50
  },
  textWrapper: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "orange",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  basket: state.basket.get("basket")
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket);
