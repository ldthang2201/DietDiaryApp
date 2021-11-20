import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Dimensions, Image, SafeAreaView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import BaseComponent from "../components/BaseComponent";
import PrimaryButton from "../components/PrimaryButton";
import { StoredKeysUtls } from "../utils/StoredKeys";
import Styles from "./Styles";

const screenUtils = require("../utils/ScreenNames")
const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.85;

export default class AccountConnectScreen extends BaseComponent {

    constructor(props) {
        super(props);

        this.navigation = this.props.navigation;
    }

    onSkip = () => {
        this.navigation.navigate(screenUtils.RegisterInfoScreen)
        
        StoredKeysUtls.setBoolean(StoredKeysUtls.key_account_connect, true);
    }

    onOpenLogin = () => {
        this.navigation.navigate(screenUtils.LoginScreen);
    }

    onOpenCreateAccount = () => {
        this.navigation.navigate(screenUtils.SigninScreen);
    }

    render() {
        return (
            <View style={Styles.container_base} >
                <View style = {{width: '80%', alignItems: 'center'}}>
                    <Image source={require('../assets/images/ImgConnect.png')}
                         resizeMode='contain' style = {{width: "80%"}} />
                    <View style={{ width: primaryButtonWidth, marginBottom: 30 }}>
                        <Text style={Styles.text_description_center}>Backup your data regularly, register an account to connect with us</Text>
                    </View>
                </View>
                <View style = {{marginBottom: 30}}>
                    <PrimaryButton title='Log in' onPress={() => this.onOpenLogin()} type='primary' />
                    <PrimaryButton title='Create your account' onPress={() => this.onOpenCreateAccount()}/>
                    <Text style = {Styles.primary_button_text}
                        onPress = {() => {
                            this.onSkip();
                        }}>Skip</Text>
                </View>
            </View>
        )
    }
}