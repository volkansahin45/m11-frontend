import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, ViewPropTypes, Image } from "react-native";
import { connect } from "react-redux";

import { addProductToBasket } from "../actions/basket";

import basketicon from '../../assets/basketicon.png';

class ProductView extends PureComponent {
  render(){
    const { product, onClick, containerStyle, addProductToBasket } = this.props;
    return (
      <TouchableOpacity onPress={onClick} >
        <View style={containerStyle} >
          <Text>{product.title}</Text>
          <TouchableOpacity onPress={() => addProductToBasket(product.title)}>
            <Image style={{ width: 30, height: 30}} source={basketicon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
} 

ProductView.propTypes = {
  containerStyle: ViewPropTypes.style,
};

ProductView.defaultProps = {
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    margin: 2,
    padding: 5,
    minHeight: 30,
    backgroundColor: "white"
  }
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  addProductToBasket
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);