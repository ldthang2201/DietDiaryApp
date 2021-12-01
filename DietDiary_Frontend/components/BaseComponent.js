import React, { Component } from "react";
import { getOne } from "../databases/Information";
import { StackActions } from "@react-navigation/native";
import { Keyboard } from "react-native";

export default class BaseComponent extends Component {

    testLog = () => {
        console.log("tesst Log from Base Compoent")
    }

    isLogin = () => {

    }

    getCurrentUser = async () => {
        const result = await getOne();
        return result;
    }

    backToPreviousScreen = (navigation) => {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
    }

    dismissKeyboard = () => {
        Keyboard.dismiss()
    }
    
}