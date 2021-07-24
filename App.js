import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';


import ScanScreen from './screens/ScanScreen';



export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Appcontainer />
      </View>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  ScanScreen: {screen:ScanScreen},
})
const Appcontainer = createAppContainer(TabNavigator)