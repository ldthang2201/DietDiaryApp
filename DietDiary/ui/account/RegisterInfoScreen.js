import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import PrimaryInput from "../../components/PrimaryInput";
import Styles from "../Styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from "../../components/PrimaryButton";
import { CommonActions } from '@react-navigation/native';
import { createInformation } from "../../databases/Information"

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
        // const newInfo = {
        //     _id: Math.floor(Date.now()),
        //     fullname: this.state.fullname,
        //     dob: this.state.dob,
        //     height: 160,
        //     weights: 80,

        // }
        // new createInformation(newInfo).then().catch((error) => console.log(error))

        //Navigate to Home
        const { navigation } = this.props;

        // remove all previous creens
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    render() {
        return (
            <View style={Styles.container_top_base}>
                <ScrollView style={{ marginBottom: 90 }} >
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/ImgInfo.png')}
                            style={{ width: 150, height: 150, alignItems: 'center' }}
                            resizeMode='contain' />
                        <PrimaryInput placeholder='Enter your full name' label='Full name' required={true} onChangeText={(text) => {
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
                                <TextInput style={Styles.weight_input} keyboardType='numeric'></TextInput>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={Styles.input_label}>Height (cm)</Text>
                                <TextInput style={Styles.weight_input} keyboardType='numeric'></TextInput>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 10 }}>
                    <PrimaryButton type='primary' title='Register' onPress={this.register} />
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