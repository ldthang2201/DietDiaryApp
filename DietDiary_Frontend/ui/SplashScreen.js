import React, { Component } from "react";
import { Image, View } from "react-native";
import Styles from "./Styles";

export default class SplashScreen extends Component {
    render() {
        return(
            <View style = {Styles.container}>
                <Image source = {require('../assets/images/ImgSplash.png')}
                    resizeMode = 'contain'
                    style={Styles.img_splash}></Image>
            </View>
        )
    }
}