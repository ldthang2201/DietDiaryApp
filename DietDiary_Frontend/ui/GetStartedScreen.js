import React, { Component } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Styles from "./Styles";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default class GetStartedScreen extends Component {
    render() {
        return (
            <View style={Styles.container} >
                <Image source={require('../assets/images/ImgStart.png')} />
                <View style = {{justifyContent: 'flex-end', marginBottom: 20}}>
                    <PrimaryButton type="primary" title="Get Started" onPress={() => console.log('click')} />
                </View>
            </View>
        )
    }
}