import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Image, View } from "react-native";
import BaseComponent from "../components/BaseComponent";
import { StoredKeysUtls } from "../utils/StoredKeys";
import Styles from "./Styles";

const screenUtils = require('../utils/ScreenNames')

export default class SplashScreen extends BaseComponent {

    //navigate to getStartScreen
    _navigateScreen = async () => {
        const {navigation} = this.props;
        
        if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_register_information) == 'true') {
            console.log('open home');
            navigation.replace(screenUtils.HomeApp);
        } else if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_account_connect) == 'true') {
            console.log('open register info');
            navigation.replace(screenUtils.RegisterInfoScreen);
        } else if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_get_started) == 'true') {
            console.log('open account');
            navigation.replace(screenUtils.AccountConnectScreen);
        } else {
            console.log('open get started');
            navigation.replace(screenUtils.GetStartedScreen);
        }
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