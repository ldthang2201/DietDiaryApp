import React, { Component, createRef } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import { Picker } from "@react-native-picker/picker"
import { logOut, updateInforTimes } from "../../databases/Information";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton";
import { EATING_TYPE, EXERCISE_TYPE, getAllReminders, resetEatingReminder, resetExerciseReminder } from "../../databases/Reminder";
import { updateCalendarTimes } from "../../databases/Calendar";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

export default class SettingsReminderScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.eatPickerRef = createRef();
        this.exercisePickerRef = createRef();

        this.state = {
            eatingTime: 3,
            preEatingTime: 3,
            doExerciseTime: 1,
            preDoExerciseTime: 1,
        }
    }

    openEatingPicker = () => {
        this.eatPickerRef.current.focus();
    }

    openExercisePicker = () => {
        this.exercisePickerRef.current.focus();
    }

    componentDidMount() {
        getAllReminders().then(result => {
            let eatCount = 0;
            let exerciseCount = 0;
            if (result) {
                result.forEach(item => {
                    if (item.type == EATING_TYPE) {
                        eatCount++;
                    } else if (item.type == EXERCISE_TYPE) {
                        exerciseCount++;
                    }
                });
            }
            this.setState({
                eatingTime: eatCount,
                preEatingTime: eatCount,
                doExerciseTime: exerciseCount,
                preDoExerciseTime: exerciseCount,
            })

        }).catch(error => console.log(error));
    }

    _onSave = async () => {
        let isDifferent = false;

        if (this.state.eatingTime != this.state.preEatingTime) {
            resetEatingReminder(this.state.eatingTime).then(() => {
                updateInforTimes(EATING_TYPE, this.state.eatingTime).then(() => {
                    updateCalendarTimes().then()
                        .catch(error => console.log(error));
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
            isDifferent = true;
        }

        if (this.state.doExerciseTime != this.state.preDoExerciseTime) {
            resetExerciseReminder(this.state.doExerciseTime).then(() => {
                updateInforTimes(EXERCISE_TYPE, this.state.doExerciseTime).then(() => {
                    updateCalendarTimes().then()
                        .catch(error => console.log(error));
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
            isDifferent = true;
        }

        if (isDifferent) {
            Alert.alert(
                'Information',
                'Your change is saved and your reminder will be reset! Do you want to set your reminder?',
                [
                    {
                        text: 'Not now',
                        onPress: () => {
                            this.backToPreviousScreen(this.navigation);
                        }
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            this.navigation.replace(screenUtls.ReminderScreen);
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            this.backToPreviousScreen(this.navigation);
        }
    }

    render() {
        return (
            <View style={Styles.container_top_base}>
                <Text style={{ ...Styles.reminder_title, textAlign: 'center' }} onPress={this.openEatingPicker}>Settings number of times to take your meals and do exercise. Your reminder will be reset if you change times of this.</Text>
                <Text style={Styles.input_label}>Set times to take your meals</Text>
                <TouchableOpacity onPress={this.openEatingPicker} style={{ marginBottom: 20 }}>
                    <TextInput style={{ ...Styles.primary_input, backgroundColor: colors.disable, textAlign: 'center' }}
                        editable={false}
                        pointerEvents='none'
                        value={String(this.state.eatingTime)} />
                </TouchableOpacity>
                <Text style={Styles.input_label}>Set times to do exercise</Text>
                <TouchableOpacity onPress={this.openExercisePicker}>
                    <TextInput style={{ ...Styles.primary_input, backgroundColor: colors.disable, textAlign: 'center' }}
                        editable={false}
                        pointerEvents='none'
                        value={String(this.state.doExerciseTime)} />
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 10 }}>
                    <PrimaryButton type='secondary' title="Save" onPress={() => this._onSave()} />
                </View>
                <Picker
                    style={{ display: 'none' }}
                    ref={this.eatPickerRef}
                    onValueChange={(value, index) => {
                        this.setState({ eatingTime: parseInt(value) });
                    }} >
                    <Picker.Item label="Your Option" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                <Picker
                    style={{ display: 'none' }}
                    ref={this.exercisePickerRef}
                    onValueChange={(value, index) => {
                        this.setState({ doExerciseTime: parseInt(value) });
                    }}>
                    <Picker.Item label="Your Option" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
            </View>
        )
    }
}