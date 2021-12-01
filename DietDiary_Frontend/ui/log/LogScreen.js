import React, { Component } from "react";
import { Alert, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createNewLog, getAllLog, deleteLog, updateLogTime } from "../../databases/Log";
import realm from "../../databases/database";
import colors from "../../assets/colors";
import { updateCalendar } from "../../databases/Calendar";

const DateTimeUtls = require('../../utils/DatetimeUtls')

const EATING_TYPE = 'eating';
const EXERCISE_TYPE = 'exercise';

export default class LogScreen extends BaseComponent {
    listSelectedLog;

    constructor(props) {
        super(props);

        this._isMounted = false;

        var lstAllLogs = [];
        this.listSelectedLog = []

        this.state = {
            isDeleteMode: false,
            isNext: false,
            isShowTimePicker: false,
            selectedLogId: "-1",
            dateDisplay: DateTimeUtls.getDateWithString(),
            lstEating: [],
            lstExercise: [],
            lstLogs: [],
        }

        realm.addListener('change', () => {
            this._reloadData();
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this._reloadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // reload list to screen
    _reloadData = () => {
        let lstEating = [];
        let lstExercise = [];
        const displayDate = this.state.dateDisplay;
        getAllLog().then(allLogs => {
            allLogs.forEach(log => {
                if (log.date == displayDate) {
                    if (log.type === EATING_TYPE) {
                        lstEating.push(log);
                    } else {
                        lstExercise.push(log);
                    }
                }
            })

            lstEating.sort((a, b) => (a.time < b.time) ? -1 : 1);
            lstExercise.sort((a, b) => (a.time < b.time) ? -1 : 1);

            this._isMounted && this.setState({
                lstLogs: allLogs,
                lstEating,
                lstExercise,
            });
        }).catch((error) => {
            console.log(error);
            this._isMounted && this.setState({
                lstLogs: [],
                lstEating,
                lstExercise,
            });
        })
    }

    // when click cancel button in edit mode
    _onCancel = () => {
        this.setState({ isDeleteMode: false, isShowTimePicker: false })
        this.listSelectedLog = []
    }

    // when click delete button in edit mode
    _onDeleteLog = () => {
        this.setState({ isDeleteMode: false })
        if (this.listSelectedLog.length == 0) {
            return;
        }

        if (this.state.dateDisplay != DateTimeUtls.getDateWithString()) {
            Alert.alert(
                'Information',
                'You are deleting record in the past, do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            deleteLog(this.listSelectedLog).then(() => {
                                this.listSelectedLog = [];
                                ToastAndroid.show('Delete selected log successfully!', ToastAndroid.LONG);
                                updateCalendar(this.state.dateDisplay).then().catch(error => console.log(error));
                            })
                        }
                    }
                ],
                { cancelable: true }
            );
        } else {
            deleteLog(this.listSelectedLog).then(() => {
                this.listSelectedLog = [];
                ToastAndroid.show('Delete selected log successfully!', ToastAndroid.LONG)
                updateCalendar(this.state.dateDisplay).then().catch(error => console.log(error));
            })
        }
    }

    // when click add button in eating list
    _onAddEatingClick = () => {
        if (this.state.dateDisplay != DateTimeUtls.getDateWithString()) {
            Alert.alert(
                'Information',
                'You are editing record in the past, do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: this._onAddEatingLog
                    }
                ],
                { cancelable: true }
            );
        } else {
            this._onAddEatingLog()
        }
    }

    _onAddEatingLog = () => {
        const now = new Date();
        const timeString = DateTimeUtls.getDisplayTime(now.getTime());
        const newLog = {
            primaryKey: now.getTime().toString(),
            date: this.state.dateDisplay,
            time: timeString,
            type: EATING_TYPE,
        }

        new createNewLog(newLog).then(() => {
            ToastAndroid.show('Add eating log successfully!', ToastAndroid.LONG);
            updateCalendar(this.state.dateDisplay).then().catch(error => console.log(error));
        }).catch((error) => console.log(error))
    }

    // when click add button in exercise list
    _onAddExerciseClick = () => {
        if (this.state.dateDisplay != DateTimeUtls.getDateWithString()) {
            Alert.alert(
                'Information',
                'You are editing record in the past, do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: this._onAddExerciseLog
                    }
                ],
                { cancelable: true }
            );
        } else {
            this._onAddExerciseLog()
        }
    }

    _onAddExerciseLog = () => {
        const now = new Date();
        const timeString = DateTimeUtls.getDisplayTime(now.getTime());
        const newLog = {
            primaryKey: now.getTime().toString(),
            date: this.state.dateDisplay,
            time: timeString,
            type: EXERCISE_TYPE,
        }

        new createNewLog(newLog).then(() => {
            ToastAndroid.show('Add exercise log successfully!', ToastAndroid.LONG);
            updateCalendar(this.state.dateDisplay).then().catch(error => console.log(error));
        }).catch((error) => console.log(error));
    }

    // when click previous in header time
    _onPreviousDate = () => {
        let lstEating = [];
        let lstExercise = [];
        const allLogs = this.state.lstLogs;
        const dateDisplay = DateTimeUtls.getPreviousDate(this.state.dateDisplay);
        allLogs.forEach(log => {
            if (log.date == dateDisplay) {
                if (log.type === EATING_TYPE) {
                    lstEating.push(log);
                } else {
                    lstExercise.push(log);
                }
            }
        })
        lstEating.sort((a, b) => (a.time < b.time) ? -1 : 1);
        lstExercise.sort((a, b) => (a.time < b.time) ? -1 : 1);
        this.setState({
            isNext: true,
            dateDisplay,
            lstEating,
            lstExercise,
        });
    }

    // when click previous in header time
    _onNextDate = () => {
        let lstEating = [];
        let lstExercise = [];
        const allLogs = this.state.lstLogs;
        const dateDisplay = DateTimeUtls.getNextDate(this.state.dateDisplay);
        allLogs.forEach(log => {
            if (log.date == dateDisplay) {
                if (log.type === EATING_TYPE) {
                    lstEating.push(log);
                } else {
                    lstExercise.push(log);
                }
            }
        })
        lstEating.sort((a, b) => (a.time < b.time) ? -1 : 1);
        lstExercise.sort((a, b) => (a.time < b.time) ? -1 : 1);
        this.setState({
            isNext: !(dateDisplay === DateTimeUtls.getDateWithString()),
            dateDisplay,
            lstEating,
            lstExercise,
        });
    }

    // when click time in log to change time
    _onChangeTimeLog = (even, selectedDate) => {
        if (selectedDate === undefined) {
            this._onCancel();
            return;
        }

        const displayTime = DateTimeUtls.getDisplayTime(selectedDate);

        if (this.state.dateDisplay != DateTimeUtls.getDateWithString()) {
            Alert.alert(
                'Information',
                'You are editing record in the past, do you want to continue?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            updateLogTime(this.state.selectedLogId, displayTime).then(() => {
                                ToastAndroid.show('Change time successfully', ToastAndroid.LONG);
                                this.setState({
                                    selectedLogId: "-1",
                                    isShowTimePicker: false,
                                })
                            }).catch((error) => console.log(error));
                        }
                    }
                ],
                { cancelable: true }
            );
        } else {
            updateLogTime(this.state.selectedLogId, displayTime).then(() => {
                ToastAndroid.show('Change time successfully', ToastAndroid.LONG);
                this.setState({
                    selectedLogId: "-1",
                    isShowTimePicker: false,
                })
            }).catch((error) => console.log(error));
        }
        this._onCancel();
    }


    render() {

        const lstEatingLogs = this.state.lstEating;
        const lstExerciseLogs = this.state.lstExercise;

        return (
            <View>
                <ScrollView>
                    <View style={Styles.container_space_between_base}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={this._onPreviousDate}>
                                <Image
                                    source={require('../../assets/icons/left-arrow.png')}
                                    style={Styles.arrow} />
                            </TouchableOpacity>
                            <Text style={Styles.log_home_title}>{this.state.dateDisplay}</Text>
                            <TouchableOpacity onPress={this.state.isNext ? this._onNextDate : null}
                                activeOpacity={this.state.isNext ? 0.2 : 1}>
                                <Image
                                    source={require('../../assets/icons/right-arrow.png')}
                                    style={this.state.isNext ? Styles.arrow : { margin: 10, width: 20, height: 20, tintColor: colors.disable }} />
                            </TouchableOpacity>
                        </View>

                        {/* EATING LOG */}
                        <View style={Styles.log_title_container}>
                            <Text style={Styles.log_title}>Eatings</Text>
                            <TouchableOpacity onPress={this._onAddEatingClick}>
                                <Image
                                    source={require('../../assets/icons/add.png')}
                                    style={Styles.image_button} />
                            </TouchableOpacity>
                        </View>
                        {lstEatingLogs.map((item) => {
                            return (
                                <TouchableOpacity activeOpacity={0.7} onLongPress={() => this.setState({ isDeleteMode: true })} key={item.primaryKey}>
                                    <View style={Styles.history_weight_item_container}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            {this.state.isDeleteMode &&
                                                <BouncyCheckbox
                                                    fillColor='red'
                                                    onPress={(isChecked) => {
                                                        if (isChecked) {
                                                            this.listSelectedLog.push(item)
                                                        } else {
                                                            const index = this.listSelectedLog.indexOf(item)
                                                            if (index > -1) {
                                                                this.listSelectedLog.splice(index, 1)
                                                            }
                                                        }
                                                    }} />}
                                            <Image source={require('../../assets/icons/food.png')} style={Styles.history_weight_item_icon} />
                                            <Text style={Styles.history_weight_item_value}>Eatings</Text>
                                        </View>
                                        <Text onPress={() => {
                                            this.setState({
                                                isShowTimePicker: true,
                                                selectedLogId: item.primaryKey,
                                            });
                                        }}>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                        {lstEatingLogs.length === 0 && <Text style={{ fontSize: 18, margin: 10 }}>No record</Text>}

                        {/* EXERCISE LOG */}
                        <View style={Styles.log_title_container}>
                            <Text style={Styles.log_title}>Do Exercise</Text>
                            <TouchableOpacity onPress={this._onAddExerciseClick}>
                                <Image
                                    source={require('../../assets/icons/add.png')}
                                    style={Styles.image_button} />
                            </TouchableOpacity>
                        </View>
                        {lstExerciseLogs.map((item) => {
                            return (
                                <TouchableOpacity activeOpacity={0.7} onLongPress={() => this.setState({ isDeleteMode: true })} key={item.primaryKey}>
                                    <View style={Styles.history_weight_item_container}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            {this.state.isDeleteMode &&
                                                <BouncyCheckbox
                                                    fillColor='red'
                                                    onPress={(isChecked) => {
                                                        if (isChecked) {
                                                            this.listSelectedLog.push(item)
                                                        } else {
                                                            const index = this.listSelectedLog.indexOf(item)
                                                            if (index > -1) {
                                                                this.listSelectedLog.splice(index, 1)
                                                            }
                                                        }
                                                    }} />}
                                            <Image source={require('../../assets/icons/exercise.png')} style={Styles.history_weight_item_icon} />
                                            <Text style={Styles.history_weight_item_value}>Exercise</Text>
                                        </View>
                                        <Text onPress={() => {
                                            this.setState({
                                                isShowTimePicker: true,
                                                selectedLogId: item.primaryKey,
                                            });
                                        }}>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                        {lstExerciseLogs.length === 0 && <Text style={{ fontSize: 18, margin: 10 }}>No record</Text>}
                    </View>
                </ScrollView>
                {this.state.isDeleteMode &&
                    <View style={Styles.delete_container}>
                        <TouchableOpacity onPress={this._onCancel}>
                            <Image source={require('../../assets/icons/cancel.png')} style={{ width: 30, height: 30, tintColor: 'black', marginBottom: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onDeleteLog}>
                            <Image source={require('../../assets/icons/delete.png')} style={{ width: 30, height: 30, tintColor: 'red' }} />
                        </TouchableOpacity>
                    </View>}
                {this.state.isShowTimePicker &&
                    <DateTimePicker
                        value={new Date()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={this._onChangeTimeLog}
                        onTouchCancel={() => this._onCancel()} />}
            </View>
        )
    }
}