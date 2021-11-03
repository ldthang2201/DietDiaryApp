import React, { Component } from "react";
import { Alert, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton"
import Styles from "../Styles";

export default class LoginScreen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    onLogin = () => {
        const username = this.state.username
        const password = this.state.password
        console.log('you clicked login')
        if (username.length == 0 || password.length < 8) {
            Alert.alert('Inform', "Your username or password is invalid", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], {cancelable: true})
        } else {
            
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
            </View>
        )
    }
}