import React, { Component } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";
import Styles from "../Styles";
import { validateEmail } from "../../utils/Utls";
import { CreateAccount, TestApi } from "../../services/NetworkService";
import AppLoader from "../../components/AppLoader";
import { createAccount } from "../../databases/Information";
const screenUtils = require('../../utils/ScreenNames')

export default class SigninScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
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

    onRegister = () => {
        this.dismissKeyboard();
        const username = this.state.username
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword

        if (password != confirmPassword) {
            Alert.alert('Inform', "Password is not match", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], {cancelable: true})
        } else if (!validateEmail(email)) {
            Alert.alert('Inform', "Your email is invalid", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], {cancelable: true})
        } else {
            console.log("Start loading");
            this.setState({isLoading: true});
            setTimeout(() => {
                CreateAccount(username, email, password).then((result) => {
                    if (result.result == "OK") {
                        Alert.alert('Inform', result.message, [
                            {
                                text: 'OK',
                                onPress: () => {
                                    let newAccount = {
                                        _id: result.accounts._id,
                                        username: username,
                                        email: email,
                                    };
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
                        ], {cancelable: true})
                    }
                    this.setState({isLoading: false})
                }).catch((error) => {
                    this.setState({isLoading: false})
                });
            }, 1500);
        }
    }

    render() {
        return (
            <View style={Styles.container_space_between_base}>
                <ScrollView style={{ marginBottom: 90}}>
                    <View>
                        <PrimaryInput label='User name' required={true} placeholder='Enter your username'
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        username: text
                                    }
                                })
                            }} />
                        <PrimaryInput label='Email' required={true} placeholder='Enter your email'
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        email: text
                                    }
                                })
                            }} />
                        <PrimaryInput label='Password' required={true} placeholder='Enter your password'
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        password: text
                                    }
                                })
                            }} isPassword={true} />
                        <Text style={Styles.text_description_center_tiny}>At least 8 character in your password</Text>
                        <PrimaryInput label='Confirm password' required={true} placeholder='Confirm your password'
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        confirmPassword: text
                                    }
                                })
                            }} isPassword={true} />
                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: 10 }}>
                    <PrimaryButton type='primary' title='Register' onPress={this.onRegister} />
                </View>
                {this.state.isLoading && <AppLoader/>}
            </View>
        )
    }
}