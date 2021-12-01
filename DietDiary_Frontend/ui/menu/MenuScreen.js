import React, { Component } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import { logOut } from "../../databases/Information";
import Styles from "../Styles";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

export default class MenuScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.state = {
            isLogin: false,
            username: "",
            fullname: "",
            email: "",
        }
    }

    onLogOut = () => {
        logOut().then(() => this.updateState()).catch();
    }

    onOpenReminder = () => {
        this.navigation.navigate(screenUtls.ReminderScreen, { isFromSettings: true });
    }

    onOpenAccountConnect = () => {
        this.navigation.navigate(screenUtls.AccountConnectScreen, { isFromSettings: true });
    }

    onOpenRegisterInfo = () => {
        this.navigation.navigate(screenUtls.RegisterInfoScreen, { isFromSettings: true });
    }

    _onResume = this.props.navigation.addListener('focus', () => {
        this.updateState();
      });


    updateState = async () => {
        const user = await this.getCurrentUser();

        let isLogin = user.username != null && user.username.length > 0 ? true : false;
        let username = isLogin ? user.username : "";
        let fullname = user.fullname;
        let email = isLogin ? user.email : "";
        this.setState({
            isLogin,
            username,
            fullname,
            email,
        })
    }

    componentDidMount() {
        this.updateState();
        this._onResume;
    }

    componentWillUnmount() {
        this._onResume();
    }

    render() {
        return (
            <ScrollView>
                <View style={Styles.container_space_between_left_base}>
                    <Text style={Styles.settings_group_title}>acs</Text>
                    <View style={Styles.divider_parent} />
                    <View style={Styles.settings_group_container}>
                        <TouchableHighlight onPress={() => this.onOpenRegisterInfo()} underlayColor={colors.button_clicked}>
                            <View style={Styles.settings_item_container}>
                                <Text style={Styles.settings_item_title}>{this.state.fullname}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={Styles.divider_child} />
                        {
                            !this.state.isLogin &&
                            <TouchableHighlight onPress={() => this.onOpenAccountConnect()} underlayColor={colors.button_clicked}>
                                <View style={Styles.settings_item_container}>
                                    <Text style={Styles.settings_item_title}>Signin/Signup</Text>
                                </View>
                            </TouchableHighlight>
                        }
                        {
                            this.state.isLogin &&
                            <TouchableHighlight onPress={() => this.onLogOut()} underlayColor={colors.button_clicked}>
                                <View style={Styles.settings_item_container}>
                                    <Text style={Styles.settings_item_title}>{this.state.email}</Text>
                                </View>
                            </TouchableHighlight>
                        }
                    </View>
                    <View style={Styles.divider_parent} />

                    <View style={{ ...Styles.divider_parent, marginTop: 40 }} />
                    <View style={Styles.settings_group_container}>
                        <TouchableHighlight onPress={() => this.onOpenReminder()} underlayColor={colors.button_clicked}>
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