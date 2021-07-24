import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions= async() =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked',
        })
    }

    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState==='clicked'&&hasCameraPermissions){
            return (
              <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}/>
            )
          }
          else if(buttonState==='normal'){
            return (
                <View style={styles.container}>
                    <Image source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg"
                    }} style={{ width: 150, height: 170 }}
                        />
                  <Text style={styles.displayText}>{hasCameraPermissions===true?this.state.scannedData:'Allow this application to access Camera?'}</Text>
                  <TouchableOpacity style={styles.scanButton} 
                  onPress={
                    this.getCameraPermissions
                  }>
                  <Text style={styles.buttonText}>Scan Bar Code</Text>
                  </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline',

  },

  scanButton: {
    backgroundColor:'green',
    padding: 10,
    margin: 10,
  },

  buttonText:{
    fontSize: 20,

  }
})