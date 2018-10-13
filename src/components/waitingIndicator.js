import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

export default class WaitingIndicator extends PureComponent{
  render(){
    const { style, size } = this.props;

    return (
      <ActivityIndicator style={style} size={size} />
    )
  }
}

WaitingIndicator.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.string
};

WaitingIndicator.defaultProps = {
  style: {
    flex: 1,
    alignSelf: "center"
  },
  size: "large"
};