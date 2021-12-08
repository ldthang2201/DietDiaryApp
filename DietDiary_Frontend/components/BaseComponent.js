import React, { Component } from "react";
import { getOne } from "../databases/Information";
import { StackActions } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { getTodayCalendar } from "../databases/Calendar";

export default class BaseComponent extends Component {

    testLog = () => {
        console.log("tesst Log from Base Compoent")
    }

    isLogin = () => {

    }

    /**
     * get current information database
     * BaseComponent
     * @returns 
     */
    getCurrentUser = async () => {
        const result = await getOne();
        return result;
    }

    /**
     * get current Calendar database
     * BaseComponent
     * @returns 
     */
    getCurrentCalendar = async () => {
        const result = await getTodayCalendar();
        return result;
    }

    /**
     * Back to previous screen
     * @param {navigation of stack} navigation 
     */
    backToPreviousScreen = (navigation) => {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
    }

    /**
     * Open new screen and finish all previous screen
     * @param {navigation of stack} navigation 
     * @param {screen name : string} screenName 
     */
    finishAllAndOpenScreen = (navigation, screenName) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screenName }],
        });
    }

    dismissKeyboard = () => {
        Keyboard.dismiss()
    }
    
}