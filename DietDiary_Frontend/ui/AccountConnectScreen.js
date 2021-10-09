import React, { Component } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Styles from "./Styles";

export default class AccountConnectScreen extends Component {
    render() {
        return (
            <SafeAreaView style = {{paddingTop: 20}}>
                <Text onPress = {() => console.log("CLcsda")}>Clickheare</Text>
            </SafeAreaView>
        )
    }
}