import React, { Component, useEffect } from "react";
import { Image, View, Text } from "react-native";
import Styles from "./Styles";
import PrimaryButton from "../components/PrimaryButton";
import BaseComponent from "../components/BaseComponent";
import { StoredKeysUtls } from "../utils/StoredKeys";
import { getDateWithString } from "../utils/DatetimeUtls";

const screenUtils = require('../utils/ScreenNames')

export default class GetStartedScreen extends BaseComponent {

    constructor(props) {
        super(props)
    }

    navigateScreen = () => {
        const { navigation } = this.props;
        // navigate screen Account Connect
        navigation.replace(screenUtils.AccountConnectScreen);

        // set flag
        StoredKeysUtls.setBoolean(StoredKeysUtls.key_get_started, true);
    }

    componentWillUnmount() {
        StoredKeysUtls.setString(StoredKeysUtls.key_date_using_app, getDateWithString());
    }

    render() {
        return (
            <View style={Styles.container} >
                <Image source={require('../assets/images/ImgStart.png')} />
                <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
                    <PrimaryButton type="primary" title="Get Started" onPress={() => this.navigateScreen()} />
                </View>
            </View>
        )
    }
}