import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Image, View } from "react-native";
import BaseComponent from "../components/BaseComponent";
import { createNewCalendar, getLastCalendar } from "../databases/Calendar";
import { getDateWithString, getNextDate } from "../utils/DatetimeUtls";
import { StoredKeysUtls } from "../utils/StoredKeys";
import Styles from "./Styles";

const screenUtils = require('../utils/ScreenNames')

export default class SplashScreen extends BaseComponent {

    //navigate to getStartScreen
    _navigateScreen = async () => {
        const { navigation } = this.props;

        if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_register_information) == 'true') {
            console.log('open home');
            navigation.replace(screenUtils.HomeApp);
        } else if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_account_connect) == 'true') {
            console.log('open register info');
            navigation.replace(screenUtils.RegisterInfoScreen);
        } else if (await StoredKeysUtls.getBoolean(StoredKeysUtls.key_get_started) == 'true') {
            console.log('open account');
            navigation.replace(screenUtils.AccountConnectScreen);
        } else {
            console.log('open get started');
            navigation.replace(screenUtils.GetStartedScreen);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this._navigateScreen()
        }, 3000)
        this._fillCalendar();
    }

    _fillCalendar = () => {
        getLastCalendar().then(result => {
            // first time using app
            if (result == null) {
                this._createCalendar().then(result => {
                    createNewCalendar(result).then().catch(error => console.log(error));
                })
            } else {
                let nextDate = getNextDate(result.date);
                while (1) {
                    const today = getDateWithString();
                    // if nextDate is current date
                    if (nextDate == today) {
                        const newCalendar = {
                            date: nextDate,
                            eatTime: result.eatTime,
                            exerciseTime: result.exerciseTime,
                            weight: result.weight,
                            preWeight : result.weight,
                        };
                        createNewCalendar(newCalendar).then().catch(error => console.log(error));
                    } else if (nextDate < today) {
                        const newCalendar = {
                            date: nextDate,
                            eatTime: result.eatTime,
                            eatingTime: -1,
                            exerciseTime: result.exerciseTime,
                            doExerciseTime: -1,
                            weight: result.weight,
                            preWeight : result.weight,
                        };
                        createNewCalendar(newCalendar).then().catch(error => console.log(error));
                    } else {
                        break;
                    }

                    nextDate = getNextDate(nextDate);
                }
            }
        })
    }

    _createCalendar = async () => {
        const newCalendar = {
            date: getDateWithString(),
            eatTime: 3,
            exerciseTime: 1,
            weight: -1,
            preWeight : -1,
        };

        return newCalendar;
    }

    render() {
        return (
            <View style={Styles.container}>
                <Image source={require('../assets/images/ImgSplash.png')}
                    resizeMode='contain'
                    style={Styles.img_splash} />
            </View>
        )
    }
}