import React, { Component } from "react";
import { Alert, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton"
import Styles from "../Styles";
import AppLoader from "../../components/AppLoader";
import { Login } from "../../services/NetworkService";
import { createAccount } from "../../databases/Information";
const screenUtils = require('../../utils/ScreenNames')

export default class LoginScreen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            isLoading: false,
        }

        this.params = props.route.params;
        this.isFromSettings = false;
        if (this.params != undefined && this.params.isFromSettings != undefined) {
            this.isFromSettings = this.params.isFromSettings;
        }
    }

    _onCreateAccountLocal = (newAccount) => {
        createAccount(newAccount).then().catch((error) => console.log(error));
        // navigate next screen
        const {navigation} = this.props;
        if (this.isFromSettings) {
            this.backToPreviousScreen(navigation);
            this.backToPreviousScreen(navigation);
        } else {
            navigation.replace(screenUtils.RegisterInfoScreen);
        }
    }

    onLogin = () => {
        this.dismissKeyboard();
        const username = this.state.username;
        const password = this.state.password;
        if (username.length == 0 || password.length < 8) {
            Alert.alert('Inform', "Your username or password is invalid", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], {cancelable: true});
        } else {
            this.setState({isLoading: true});
            setTimeout(() => {
                Login(username, password).then((result) => {
                    if (result.result == "OK") {
                        Alert.alert('Inform', result.message, [
                            {
                                text: 'OK',
                                onPress: () => {
                                    const acc = result.accounts;
                                    const newAccount = {
                                        _id: acc._id,
                                        username: acc.username,
                                        email: acc.email,
                                    }
                                    this._onCreateAccountLocal(newAccount);
                                }
                            }
                        ], {cancelable: false})
                    } else if (result.result == "Fail") {
                        Alert.alert('Inform', result.message, [
                            {
                                text: 'OK',
                                style: 'cancel'
                            }
                        ], {cancelable: true});
                    } else {
                        Alert.alert('Error', `${result}. Please try later`, [
                            {
                                text: 'OK',
                                style: 'cancel'
                            }
                        ], {cancelable: true});
                    }
                    this.setState({isLoading: false})
                }).catch((error) => {
                    Alert.alert('Error', `${error}. Please try later`, [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ], {cancelable: true});
                    this.setState({isLoading: false})
                });
            }, 1500)
        }
    }

    render() {
        return (
            <View style={Styles.container_space_between_base}>
                <View>
                    <PrimaryInput onChangeText={(text) => {
                        this.setState(() => {
                            return {
                                username: text
                            }
                        })
                    }} label='User name' required={true} placeholder='Enter your user name'/>
                    <PrimaryInput onChangeText={(text) => {
                        this.setState(() => {
                            return {
                                password: text
                            }
                        })
                    }} label='Password' required={true} placeholder='Enter your password' isPassword={true} />
                    <Text style={Styles.primary_button_text}>Fogot your password</Text>
                </View>
                <PrimaryButton type = 'primary' title = 'Log in' onPress = {this.onLogin}/>
                {this.state.isLoading && <AppLoader/>}
            </View>
        )
    }
}