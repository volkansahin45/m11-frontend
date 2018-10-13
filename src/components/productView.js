import React, {PureComponent} from 'react';
import { Text, StyleSheet, View, Platform, TouchableOpacity } from "react-native";

export default class ProductView extends PureComponent {
  render(){
    const { product, onClick } = this.props;
    
    return (
      <TouchableOpacity onPress={onClick} >
        <View style={styles.container} >
          <Text>{product.Product.Name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 5,
    minHeight: 30,
    backgroundColor: "white"
  }
})