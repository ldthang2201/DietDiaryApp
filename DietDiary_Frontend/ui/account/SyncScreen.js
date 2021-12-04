import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import AnimatedLottieView from "lottie-react-native";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.85;

export default class SyncScreen extends BaseComponent {

    constructor(props) {
        super(props);

        this.navigation = this.props.navigation;

        this.params = props.route.params;
        this.isFromSettings = false;
        if (this.params != undefined && this.params.isFromSettings != undefined) {
            this.isFromSettings = this.params.isFromSettings;
        }
    }

    onSkip = () => {
        this.navigation.navigate(screenUtils.RegisterInfoScreen)

        StoredKeysUtls.setBoolean(StoredKeysUtls.key_account_connect, true);
    }

    onOpenLogin = () => {
        this.navigation.navigate(screenUtils.LoginScreen, { isFromSettings: this.isFromSettings });
    }

    onOpenCreateAccount = () => {
        this.navigation.navigate(screenUtils.SigninScreen, { isFromSettings: this.isFromSettings });
    }

    render() {
        return (
            <View style={Styles.container_base} >
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/cloud.png')}
                        style={{ width: screenWidth * 0.5, height: screenWidth * 0.5 }} />
                    <View style={{ width: primaryButtonWidth}}>
                        <Text style={Styles.text_description_center}>To backup your data, sync manual now</Text>
                    </View>
                    <View>
                        <AnimatedLottieView style = {{width: 150}} source={require('../../assets/gifs/dotsloading.json')} autoPlay loop />
                    </View>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <PrimaryButton title='Sync now' onPress={() => this.onOpenCreateAccount()} type = "primary"/>
                </View>
            </View>
        )
    }
}