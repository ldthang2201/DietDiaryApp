import React, { Component } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import AnimatedLottieView from "lottie-react-native";
import { syncAll } from "../../utils/SyncUtils";
import { StoredKeysUtls } from "../../utils/StoredKeys";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.85;

export default class SyncScreen extends BaseComponent {

    constructor(props) {
        super(props);

        this.navigation = this.props.navigation;

        this.params = props.route.params;
        this.isFromSettings = false;
        if (this.params != undefined && this.params.isFromSettings != undefined) {
            this.isFromSettings = this.params.isFromSettings;
        }

        this.state = {
            isSync: false
        }
    }

    _onSync = async () => {
        this.setState({
            isSync: true
        });

        setTimeout(() => {
            syncAll().then(result => {
                this.setState({
                    isSync: false
                });
                if (result) {
                    Alert.alert('Inform', "Sync successfully!", [
                        {
                            text: 'OK',
                            onPress: () => {
                                if (this.isFromSettings) {
                                    this.backToPreviousScreen(this.navigation);
                                } else {
                                    this.finishAllAndOpenScreen(this.navigation, screenUtls.HomeApp);
                                    // set flag
                                    StoredKeysUtls.setBoolean(StoredKeysUtls.key_register_information, true);
                                }
                            }
                        }
                    ], { cancelable: false })
                } else {
                    Alert.alert('Error', "Sync error, please try later!", [
                        {
                            text: 'OK',
                            onPress: () => {
                                if (this.isFromSettings) {
                                    this.backToPreviousScreen(this.navigation);
                                } else {
                                    this.finishAllAndOpenScreen(this.navigation, screenUtls.RegisterInfoScreen);
                                }
                            }
                        }
                    ], { cancelable: false })
                }
            })
        }, 1500);
    }

    render() {
        return (
            <View style={Styles.container_base} >
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/cloud.png')}
                        style={{ width: screenWidth * 0.5, height: screenWidth * 0.5 }} />
                    <View style={{ width: primaryButtonWidth }}>
                        <Text style={Styles.text_description_center}>To backup your data, sync manual now</Text>
                    </View>
                    {
                        this.state.isSync &&
                        <View>
                            <AnimatedLottieView style={{ width: 150 }} source={require('../../assets/gifs/dotsloading.json')} autoPlay loop />
                        </View>
                    }
                </View>
                {
                    !this.state.isSync &&
                    <View style={{ marginBottom: 30 }}>
                        <PrimaryButton title='Sync now' onPress={() => this._onSync()} type="primary" />
                    </View>
                }
            </View>
        )
    }
}