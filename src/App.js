import React from 'react';
import { Provider } from "react-redux";
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

import Router from "./router";

let store, unsubscribe;

export default class App extends React.Component {
  constructor(props){
    super(props);

    store = createStore(reducer, applyMiddleware(thunk));

    unsubscribe = store.subscribe(() => {})
  }

  componentWillUnmount(){
    unsubscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider> 
    );
  }
}
