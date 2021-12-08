import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

export default class MenuScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;
    }

    render() {
        return (
            <ScrollView>
                <View style={Styles.container_space_between_left_base}>
                    <TouchableHighlight onPress={() => this.navigation.navigate(screenUtls.SettingScreen)} style={{ marginTop: 20, borderRadius: 20 }}>
                        <View style={{ ...Styles.menu_item_container, borderRadius: 20 }}>
                            <Image source={require('../../assets/icons/user.png')} style={Styles.menu_item_icon} />
                            <View>
                                <Text numberOfLines={1} style={Styles.menu_item_title}>Information</Text>
                                <Text numberOfLines={1} style={Styles.menu_item_sub_title}>Settings your information and account</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.navigation.navigate(screenUtls.ReminderScreen)} style={{ marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{ ...Styles.menu_item_container, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Image source={require('../../assets/icons/notification.png')} style={Styles.menu_item_icon} />
                            <View>
                                <Text numberOfLines={1} style={Styles.menu_item_title}>Reminder</Text>
                                <Text numberOfLines={1} style={Styles.menu_item_sub_title}>Reminder your meals and do exercise</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={Styles.divider_menu_item} />
                    <TouchableHighlight onPress={() => this.navigation.navigate(screenUtls.FoodsScreen)} style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <View style={{ ...Styles.menu_item_container, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                            <Image source={require('../../assets/icons/salad.png')} style={Styles.menu_item_icon} />
                            <View>
                                <Text numberOfLines={1} style={Styles.menu_item_title}>Foods</Text>
                                <Text numberOfLines={1} style={Styles.menu_item_sub_title}>Information of foods maybe help your diet</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}