import React, { PureComponent } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ViewPropTypes,
  Image
} from "react-native";
import { connect } from "react-redux";

import { addProductToBasket } from "../actions/basket";

import basketicon from "../../assets/basketicon.png";

class ProductView extends PureComponent {
  render() {
    const { product, onClick, containerStyle, addProductToBasket } = this.props;
    return (
      <TouchableOpacity onPress={onClick}>
        <View style={containerStyle}>
          <Text style={{ flex: 1, fontSize: 17 }}>{product.Name}</Text>
          <TouchableOpacity onPress={() => addProductToBasket(product.title)}>
            <Image style={{ width: 30, height: 30 }} source={basketicon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductView.propTypes = {
  containerStyle: ViewPropTypes.style
};

ProductView.defaultProps = {
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 2,
    padding: 10,
    backgroundColor: "white"
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addProductToBasket
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductView);
