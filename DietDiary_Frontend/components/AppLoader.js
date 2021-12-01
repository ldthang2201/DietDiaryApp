import AnimatedLottieView from "lottie-react-native";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class AppLoader extends Component {
    render() {
        return (
            <View style = {[StyleSheet.absoluteFillObject, styles.container]}>
                <AnimatedLottieView source = {require('../assets/gifs/loading.json')} autoPlay loop/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})
