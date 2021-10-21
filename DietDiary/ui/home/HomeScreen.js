import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Styles from "../Styles";
import colors from "../../assets/colors";
import { getDateWithString } from "../../utils/DatetimeUtls";

const screenWidth = Dimensions.get('window').width;
const calendarItemWidth = screenWidth / 7;
const calendarItemHeight = screenWidth / 8;
const calendarCircle = calendarItemHeight * 0.7;

var ListLogEx = [
    {
        id: 1,
        datetime: '2021-10-20',
        date: 1,
        month: 10,
        year: 2021,
        eats: 3,
        timeEx: 2,
        exercises: 1,
    },
    {
        id: 2,
        datetime: '2021-10-21',
        date: 2,
        month: 10,
        year: 2021,
        eats: 2,
        timeEx: 2,
        exercises: 1,
    },
    {
        id: 3,
        datetime: '2021-10-18',
        date: 20,
        month: 10,
        year: 2021,
        eats: 3,
        timeEx: 2,
        exercises: 1,
    },
    {
        id: 4,
        datetime: '2021-10-15',
        date: 19,
        month: 10,
        year: 2021,
        eats: 2,
        timeEx: 2,
        exercises: 2,
    },
    {
        id: 5,
        datetime: '2021-10-14',
        date: 21,
        month: 10,
        year: 2021,
        eats: 2,
        timeEx: 2,
        exercises: 2,
    },
]

export default class HomeScreen extends BaseComponent {

    constructor(props) {
        super(props);

        const log = ListLogEx.find(log => {
            return log.datetime === getDateWithString()
        })

        this.state = {
            isLoading: false,
            selectedDate: 'Today',
            lstLog: ListLogEx,
            isNoRecord: log === undefined,
            eats: log === undefined ? 0 : log.eats,
            exercises: log === undefined ? 0 : log.exercises,
            displayType: log
        }
    }

    _unsubscribe = this.props.navigation.addListener('focus', () => {
        // todo: update list log here
        this.setState({});
    });

    componentDidMount() {
        this._unsubscribe;
    }

    componentWillUnmount() {
        this._unsubscribe();
    }



    render() {
        const today = new Date();
        const string = today.toJSON();
        const now = JSON.stringify(string)
        return (
            <ScrollView style={{ backgroundColor: colors.baseBackground }}>
                <View>
                    <Calendar
                        // Initially visible month. Default = Date()
                        current={today}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2021-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={today}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Do not show days of other months in month page. Default = false
                        // hideExtraDays={true}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => { console.log('selected day', day) }}
                        displayLoadingIndicator={false}
                        dayComponent={(date) => {
                            // get select datetime
                            const selectedDate = date.date.dateString;
                            // get listLog in State
                            const listLogs = this.state.lstLog
                            //get selected Log
                            const selectedLog = listLogs.find(log => {
                                return log.datetime === selectedDate
                            })

                            let displayColorItem = 'white'

                            if (selectedLog != undefined) {
                                if (selectedLog.timeEx > selectedLog.exercises) {
                                    displayColorItem = colors.notgood
                                } else if (selectedLog.timeEx <= selectedLog.exercises) {
                                    displayColorItem = colors.good
                                }
                            }

                            const activeDate = (
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        isNoRecord: selectedLog === undefined,
                                        selectedDate: date.state === 'today' ? 'Today' : date.accessibilityLabel,
                                        eats: selectedLog === undefined ? 0 : selectedLog.eats,
                                        exercises: selectedLog === undefined ? 0 : selectedLog.exercises,
                                    })
                                }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: calendarItemWidth, height: calendarItemHeight }}>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: '600' }}>{date.date.day}</Text>
                                        <View style={{ width: calendarItemWidth * 0.5, height: calendarItemHeight * 0.1, backgroundColor: displayColorItem, borderRadius: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            )

                            const unactiveDate = (
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: calendarItemWidth, height: calendarItemHeight }}>
                                    <Text style={{ color: colors.disable, fontSize: 14 }}>{date.date.day}</Text>
                                    <View style={{ width: calendarItemWidth * 0.5, height: calendarItemHeight * 0.1, backgroundColor: 'white', borderRadius: 10 }} />
                                </View>
                            )

                            const displayDate = date.state === 'disabled' ? unactiveDate : activeDate
                            return (displayDate)
                        }}
                    />
                    <Text style={Styles.log_home_title}>{this.state.selectedDate}</Text>
                    {!this.state.isNoRecord &&
                        (<View style = {{marginBottom: 20}}>
                            <View style={Styles.container_full_width_center_top}>
                                <View style={Styles.log_home}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/icons/food.png')}
                                            style={Styles.image_log} />
                                        <Text style={Styles.log_home_text_times}>Eatings</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={Styles.log_home_text_number}>{this.state.eats}</Text>
                                        <Text style={Styles.log_home_text_times}>Times</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={Styles.container_full_width_center_top}>
                                <View style={Styles.log_home}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../assets/icons/exercise.png')}
                                            style={Styles.image_log} />
                                        <Text style={Styles.log_home_text_times}>Exercises</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={Styles.log_home_text_number}>{this.state.exercises}</Text>
                                        <Text style={Styles.log_home_text_times}>Times</Text>
                                    </View>
                                </View>
                            </View>
                        </View>)
                    }
                    {this.state.isNoRecord && (
                        <View style={Styles.container_center_top}>
                            <Text style = {{marginBottom: 20}}>No record </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        )
    }

    // RenderDate(props) {
    //     const date = props.date;
    //     return (
    //         <TouchableOpacity onPress={this.onDatePress(date)}>
    //             <View style={{ justifyContent: 'center', alignItems: 'center', width: calendarItemWidth, height: calendarItemHeight }}>
    //                 <View style={{ borderColor: date.state === 'disabled' ? 'white' : 'red', borderWidth: 3, borderRadius: calendarCircle, width: calendarCircle, height: calendarCircle, justifyContent: 'center', alignItems: 'center' }}>
    //                     <Text style={{ color: date.state === 'disabled' ? 'gray' : 'black' }}>{date.date.day}</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }
}


// const a = {
//     "accessibilityLabel": " Saturday 6 November 2021 ", "children": 6, "date": {
//         "dateString": "2021-11-06", "day": 6, "month": 11, "timestamp": 1636156800000,
//         "year": 2021
//     }, "dayComponent": [Function dayComponent], "marking": undefined, "onLongPress": [Function anonymous], "onPress": [Function anonymous], "state": "disabled", "testID": "native.calendar.SELECT_DATE_SLOT-2021-11-06"
// }