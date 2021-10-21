import React, { Component } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton"
import Styles from "../Styles";

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
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
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