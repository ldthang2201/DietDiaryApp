import React, { Component } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import { logOut } from "../../databases/Information";
import Styles from "../Styles";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

export default class SettingsReminderScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;
    }

    render() {
        return (
            <View style={Styles.container_top_base}>
                    <Text style={{...Styles.reminder_title, textAlign: 'center'}}>Settings number of times to take your meals and do exercise. Your reminder will be reset if you change times of this.</Text>
                    <Text style={{...Styles.reminder_title, textAlign: 'center'}}></Text>
                </View>
        )
    }
}