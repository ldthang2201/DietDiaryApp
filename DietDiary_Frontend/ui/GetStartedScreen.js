import React, { Component, useEffect } from "react";
import { Image, View, Text } from "react-native";
import Styles from "./Styles";
import PrimaryButton from "../components/PrimaryButton";
import BaseComponent from "../components/BaseComponent";

const screenUtils = require('../utils/ScreenNames')

export default class GetStartedScreen extends BaseComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props;
        return (

            <View style={Styles.container} >
                <Image source={require('../assets/images/ImgStart.png')} />
                <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
                    <PrimaryButton type="primary" title="Get Started" onPress={() => navigation.replace(screenUtils.AccountConnectScreen)} />
                </View>
            </View>
        )
    }
}