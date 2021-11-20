import React, { Component } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
const colors = require('../../assets/colors');

export default class SettingScreen extends BaseComponent {
    render() {
        return (
            <ScrollView>
                <View style={Styles.container_space_between_left_base}>
                    <Text style={Styles.settings_group_title}>Settings information and application</Text>
                    <View style={Styles.divider_parent} />
                    <View style={Styles.settings_group_container}>
                        <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}> // Todo: Load fullname</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={Styles.divider_child} />
                        <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}> // Todo: Signin-Signup</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={Styles.divider_child} />
                        <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}> // Todo: Show Email (ldthang2201@gmail.com)</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={Styles.divider_parent} />

                    <View style={{ ...Styles.divider_parent, marginTop: 40 }} />
                    <View style={Styles.settings_group_container}>
                        <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}> Alarm reminder</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={Styles.divider_child} />
                        <TouchableHighlight onPress={() => console.log('you clicked')} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}> Settings you weight</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={Styles.divider_parent} />
                    
                </View>
            </ScrollView>
        )
    }
}