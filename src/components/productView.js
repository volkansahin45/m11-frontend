import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, ViewPropTypes } from "react-native";

export default class ProductView extends PureComponent {
  render(){
    const { product, onClick, containerStyle } = this.props;
    
    return (
      <TouchableOpacity onPress={onClick} >
        <View style={containerStyle} >
          <Text>{product.Product.Name}</Text>
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
    borderRadius: 5,
    margin: 5,
    padding: 5,
    minHeight: 30,
    backgroundColor: "white"
  }
};