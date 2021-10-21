import React, { Component } from "react";
import { Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";

export default class ChartScreen extends BaseComponent {
    render() {
        return (
            <View style = {Styles.container_space_between_base}>
                   <Text style = {Styles.text_description_bold}>Chart Screen</Text> 
            </View>
        )
    }
}