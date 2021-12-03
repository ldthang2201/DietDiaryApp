import React, { Component } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import Styles from "../Styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from "../../components/PrimaryButton";
import { registerInformation } from "../../databases/Information";
import { StoredKeysUtls } from "../../utils/StoredKeys";
import { getTodayCalendar, updateWeight } from "../../databases/Calendar";
import { getDateWithString } from "../../utils/DatetimeUtls";
const screenUtils = require('../../utils/ScreenNames')
const screenWidth = Dimensions.get('window').width;
const primaryButtonWidth = screenWidth * 0.85;

export default class RegisterInfoScreen extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            dob: '',
            show: false,
            fullname: '',
            height: '',
            weight: '',
        }

        this.params = props.route.params;
        this.isFromSettings = false;
        if (this.params != undefined && this.params.isFromSettings != undefined) {
            this.isFromSettings = this.params.isFromSettings;
        }
    }

    _onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.dob
        if (selectedDate === undefined) {
            return
        }
        let tempDate = new Date(currentDate)
        let formatDate = tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
        this.setState((previousState) => {
            return {
                dob: formatDate || previousState,
                show: false
            }
        })
    }

    register = () => {
        const fullname = this.state.fullname.trim();
        const dob = this.state.dob.trim();
        const height = this.state.height.trim();
        const weight = this.state.weight.trim();

        if (fullname.length == 0 || dob.length == 0 || height.length == 0) {
            Alert.alert('Inform', "Please valid all field", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            return
        }

        if (isNaN(height) || isNaN(weight)) {
            Alert.alert('Error', "Please input a number in Weight and Height!", [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
            return
        }

        const newInfo = {
            fullname,
            dob,
            height: parseFloat(height),
        }

        if (!this.isFromSettings) {
            newInfo.dateUsingApp = getDateWithString();
        }

        updateWeight(parseFloat(weight)).then().catch(error => console.log(error));

        registerInformation(newInfo).then(result => {
            //Navigate to Home
            const { navigation } = this.props;

            if (this.isFromSettings) {
                // back to settings screen
                this.backToPreviousScreen(navigation);
            } else {
                // remove all previous creens
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }

            // set flag
            StoredKeysUtls.setBoolean(StoredKeysUtls.key_register_information, true);
        }).catch(error => {

            Alert.alert('Error', `${error}. Please quit app and try again`, [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ], { cancelable: true });
        });
    }

    updateState = async () => {
        const user = await this.getCurrentUser();
        const calendar = await this.getCurrentCalendar();
        if (user && calendar) {
            this.setState({
                fullname: user.fullname,
                dob: user.dob,
                height: String(user.height) == undefined ? "" : String(user.height),
                weight: String(calendar.weight) == "-1" ? "" : String(calendar.weight),
            })
        }
    }

    componentDidMount() {
        if (this.isFromSettings) {
            this.updateState()
        }
    }

    render() {
        return (
            <View style={Styles.container_top_base}>
                <ScrollView style={{ marginBottom: 90 }} >
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/ImgInfo.png')}
                            style={{ width: 150, height: 150, alignItems: 'center' }}
                            resizeMode='contain' />
                        <PrimaryInput placeholder='Enter your full name' label='Full name' required={true} value={this.state.fullname} onChangeText={(text) => {
                            this.setState({
                                fullname: text
                            })
                        }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={Styles.input_label}>Date of birth</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        show: true
                                    })
                                }}
                                activeOpacity={1}>
                                <TextInput style={Styles.primary_input}
                                    placeholder={'Enter your date of birth'}
                                    placeholderTextColor='gray'
                                    editable={false}
                                    pointerEvents='none'
                                    value={this.state.dob}
                                    onChangeText={(text) => {
                                        this.setState({
                                            dob: text
                                        })
                                    }}></TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: primaryButtonWidth }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={Styles.input_label}>Weight (kg)</Text>
                                <TextInput style={Styles.weight_input} keyboardType='numeric' value={String(this.state.weight)}
                                    onChangeText={(text) => this.setState({ weight: text })}></TextInput>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={Styles.input_label}>Height (cm)</Text>
                                <TextInput style={Styles.weight_input} keyboardType='numeric' value={String(this.state.height)}
                                    onChangeText={(text) => this.setState({ height: text })}></TextInput>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 10 }}>
                    <PrimaryButton type='primary' title={this.isFromSettings ? "Save" : "Register"} onPress={this.register} />
                </View>
                {this.state.show && (
                    <DateTimePicker
                        value={new Date()}
                        mode={'date'}
                        display="default"
                        onChange={this._onChangeDate}
                        maximumDate={new Date()} />
                )}
            </View>
        )
    }
}