import React, { Component } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton"
import Styles from "../Styles";
import { validateEmail } from "../../utils/Utls";
import { CreateAccount, TestApi } from "../../services/NetworkService";

export default class SigninScreen extends BaseComponent {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    onRegister = () => {
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
            CreateAccount(username, email, password).then((result) => {
                if (result.result == "OK") {
                    Alert.alert('Inform', result.message, [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ], {cancelable: true})
                } else if (result.result == "Fail") {
                    Alert.alert('Inform', result.message, [
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ], {cancelable: true})
                }
                console.log("Stop loading");
            }).catch((error) => {
                console.log("Stop loading");
            });
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
            </View>
        )
    }
}