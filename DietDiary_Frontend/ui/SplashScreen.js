import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Image, View } from "react-native";
import BaseComponent from "../components/BaseComponent";
import Styles from "./Styles";
import StoreKeys from "../utils/StoredKeys"

const screenUtils = require('../utils/ScreenNames')

export default class SplashScreen extends BaseComponent {

    //navigate to getStartScreen
    _navigateScreen = async () => {
        const {navigation} = this.props
        
        // try {
        //     if ((await AsyncStorage.getItem(StoreKeys.key_register_information)) == 'true')  {
        //         navigation.replace(screenUtils.GetStartedScreen)
        //     } else if ((await AsyncStorage.getItem(StoreKeys.key_account_connect)) == 'true') {
        //         navigation.replace(screenUtils.RegisterInfoScreen)
        //     } else {
        //         navigation.replace(screenUtils.GetStartedScreen)
        //     }
        // } catch (error) {
        //     navigation.replace(screenUtils.GetStartedScreen)
        // }

        navigation.replace(screenUtils.GetStartedScreen)
    }

    componentDidMount() {
        setTimeout(() => {
            this._navigateScreen()
        }, 3000)
    }

    render() {
        return(
            <View style = {Styles.container}>
                <Image source = {require('../assets/images/ImgSplash.png')}
                    resizeMode = 'contain'
                    style={Styles.img_splash}/>
            </View>
        )
    }
}