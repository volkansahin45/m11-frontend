import React from "react";
import {
  Text,
  View
} from "react-native";

export default class Detail extends React.Component {
  static navigationOptions = {
    headerTitle: "Detail"
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Volkan</Text>
      </View>
    );
  }
}
