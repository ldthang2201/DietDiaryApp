import React, { Component } from "react";
import { FlatList, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { createNewLog, getAllLog } from "../../databases/Log";
import realm from "../../databases/database";

const DateTimeUtls = require('../../utils/DatetimeUtls')

// const lstLogs = [
//     {
//         id: 1,
//         date: '2021-10-22',
//         time: '11:20',
//         type: 'eating',
//     },
//     {
//         id: 2,
//         date: '2021-10-22',
//         time: '06:20',
//         type: 'exercise',
//     },
//     {
//         id: 3,
//         date: '2021-10-22',
//         time: '11:20',
//         type: 'eating',
//     },
//     {
//         id: 4,
//         date: '2021-10-21',
//         time: '11:20',
//         type: 'exercise',
//     },
//     {
//         id: 5,
//         date: '2021-10-21',
//         time: '11:20',
//         type: 'eating',
//     },
//     {
//         id: 6,
//         date: '2021-10-20',
//         time: '11:20',
//         type: 'exercise',
//     },
//     {
//         id: 7,
//         date: '2021-10-19',
//         time: '11:20',
//         type: 'exercise',
//     },
//     {
//         id: 8,
//         date: '2021-10-19',
//         time: '11:20',
//         type: 'exercise',
//     },
//     {
//         id: 9,
//         date: '2021-10-19',
//         time: '11:20',
//         type: 'eating',
//     },
// ];

const EATING_TYPE = 'eating';
const EXERCISE_TYPE = 'exercise';

export default class LogScreen extends BaseComponent {
    listSelectedLog;

    constructor(props) {
        super(props);

        var lstAllLogs = [];
        this.listSelectedLog = []

        this.state = {
            isDeleteMode: false,
            lstLogs: [],
        }

        this._reloadData()

        realm.addListener('change', () => {
            this._reloadData();
        });
    }

    _reloadData = () => {
        getAllLog().then(allLogs => {
            this.setState({
                lstLogs: allLogs
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                lstLogs: []
            });
        })
    }

    _onCancel = () => {
        this.setState({ isDeleteMode: false })
        this.listSelectedLog = []
    }

    _onDeleteLog = () => {
        this.setState({ isDeleteMode: false })
        this.listSelectedLog = []
    }

    _onAddEatingLog = () => {
        const now = new Date();
        const timeString = now.getHours() + ':' + now.getMinutes();
        const newLog = {
            _id: now.getTime(),
            date: DateTimeUtls.getDateWithString(),
            time: timeString,
            type:   EATING_TYPE,
        }

        new createNewLog(newLog).then(ToastAndroid.show('Add eating log successfully!', ToastAndroid.LONG)).catch((error) => console.log(error))
    }

    _onAddExerciseLog = () => {
        const now = new Date();
        const timeString = now.getHours() + ':' + now.getMinutes();
        const newLog = {
            _id: now.getTime(),
            date: DateTimeUtls.getDateWithString(),
            time: timeString,
            type:   EXERCISE_TYPE,
        }

        new createNewLog(newLog).then(ToastAndroid.show('Add eating log successfully!', ToastAndroid.LONG)).catch((error) => console.log(error))
    }

    _onPreviousDate = () => {

    }

    _onNextDate = () => {

    }


    render() {

        const lstLogs = this.state.lstLogs;

        return (
            <View>
                <ScrollView>
                    <View style={Styles.container_space_between_base}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/icons/left-arrow.png')}
                                    style={Styles.arrow} />
                            </TouchableOpacity>
                            <Text style={Styles.log_home_title}>2021-10-11</Text>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/icons/right-arrow.png')}
                                    style={Styles.arrow} />
                            </TouchableOpacity>
                        </View>

                        {/* EATING LOG */}
                        <View style={Styles.log_title_container}>
                            <Text style={Styles.log_title}>Eatings</Text>
                            <TouchableOpacity onPress={this._onAddEatingLog}>
                                <Image
                                    source={require('../../assets/icons/add.png')}
                                    style={Styles.image_button} />
                            </TouchableOpacity>
                        </View>
                        {lstLogs.map((item) => {
                            if (item.type != EATING_TYPE) {
                                return null;
                            }
                            return (
                                <TouchableOpacity activeOpacity={0.7} onLongPress={() => this.setState({ isDeleteMode: true })} key={item._id}>
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
                                        <Text>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        {/* EXERCISE LOG */}
                        <View style={Styles.log_title_container}>
                            <Text style={Styles.log_title}>Do Exercise</Text>
                            <TouchableOpacity onPress={this._onAddExerciseLog}>
                                <Image
                                    source={require('../../assets/icons/add.png')}
                                    style={Styles.image_button} />
                            </TouchableOpacity>
                        </View>
                        {lstLogs.map((item) => {
                            if (item.type != EXERCISE_TYPE) {
                                return null;
                            }
                            return (
                                <TouchableOpacity activeOpacity={0.7} onLongPress={() => this.setState({ isDeleteMode: true })} key={item._id}>
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
                                        <Text>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
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
            </View>
        )
    }
}