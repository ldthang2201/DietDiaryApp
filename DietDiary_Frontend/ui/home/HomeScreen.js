import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Styles from "../Styles";
import colors from "../../assets/colors";
import { getDateWithString } from "../../utils/DatetimeUtls";
import { getAllCalendars } from "../../databases/Calendar";
import { StoredKeysUtls } from "../../utils/StoredKeys";

const screenWidth = Dimensions.get('window').width;
const calendarItemWidth = screenWidth / 7;
const calendarItemHeight = screenWidth / 8;
const calendarCircle = calendarItemHeight * 0.7;

export default class HomeScreen extends BaseComponent {

    constructor(props) {
        super(props);

        this.listCalendars = [];

        this.state = {
            isLoading: false,
            selectedDateDisplayed: 'Today',
            isNoRecord: true,
            eats: 0,
            exercises: 0,
            displayCalendar: {},
            selectedDate: getDateWithString(),
            minDateCalendar: '2021-05-10',
        }
    }

    _unsubscribe = this.props.navigation.addListener('focus', () => {
        // todo: update list log here
        this._updateState();
    });

    componentDidMount() {
        this._unsubscribe;
        this._updateState();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _updateState = async () => {
        this.listCalendars = await getAllCalendars();
        const selectedCalendar = this.listCalendars.find(item => item.date == this.state.selectedDate);
        // set no record
        let isNoRecord = selectedCalendar == undefined;

        let minDateCalendar = await StoredKeysUtls.getString(StoredKeysUtls.key_date_using_app);
        if (!minDateCalendar) {
            minDateCalendar = minDateCalendar.length > 0 ? minDateCalendar : this.state.minDateCalendar;
        }

        if (selectedCalendar && selectedCalendar.doExerciseTime == -1 && selectedCalendar.eatingTime == -1) {
            isNoRecord = true;
        }
        this.setState({
            displayCalendar: selectedCalendar,
            isNoRecord: isNoRecord,
            eats: selectedCalendar === undefined ? 0 : selectedCalendar.eatingTime,
            exercises: selectedCalendar === undefined ? 0 : selectedCalendar.doExerciseTime,
            minDateCalendar,
        })

    }

    render() {
        const today = new Date();

        return (
            <ScrollView style={{ backgroundColor: colors.basepopBackground }}>
                <View>
                    <Calendar
                        // Initially visible month. Default = Date()
                        current={today}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={this.state.minDateCalendar}
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
                            //get selected Log
                            const selectedCalendar = this.listCalendars.find(item => {
                                return item.date === selectedDate
                            })

                            let displayColorItem = 'white';

                            if (this.state.selectedDate === date.date.dateString) {
                                displayColorItem = '#DEE4CF';
                            }
                            // display color of text number
                            if (selectedCalendar != undefined) {
                                if (selectedCalendar.preWeight != -1 && selectedCalendar.preWeight < selectedCalendar.weight) {
                                    displayColorItem = colors.bad;
                                } else if (selectedCalendar.exerciseTime > selectedCalendar.doExerciseTime && selectedCalendar.doExerciseTime != -1) {
                                    displayColorItem = colors.notgood;
                                } else if (selectedCalendar.exerciseTime <= selectedCalendar.doExerciseTime) {
                                    displayColorItem = colors.good;
                                }
                            }

                            // display background of selected date
                            let displayBackground = 'white';
                            if (this.state.selectedDate === date.date.dateString) {
                                displayBackground = colors.selected;
                            }

                            const activeDate = (
                                <TouchableOpacity onPress={() => {
                                    let isNoRecord = selectedCalendar == undefined;
                                    if (selectedCalendar && selectedCalendar.doExerciseTime == -1 && selectedCalendar.eatingTime == -1) {
                                        isNoRecord = true;
                                    }
                                    this.setState({
                                        isNoRecord: isNoRecord,
                                        selectedDateDisplayed: date.state === 'today' ? 'Today' : date.accessibilityLabel,
                                        selectedDate: date.date.dateString,
                                        displayCalendar: selectedCalendar,
                                        eats: selectedCalendar === undefined ? 0 : selectedCalendar.eatingTime,
                                        exercises: selectedCalendar === undefined ? 0 : selectedCalendar.doExerciseTime,
                                    })
                                }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: calendarItemWidth, height: calendarItemHeight, backgroundColor: displayBackground }}>
                                        <Text style={{ color: date.state === 'today' ? 'blue' : 'black', fontSize: 14, fontWeight: '600' }}>{date.date.day}</Text>
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
                    <View style={Styles.divider_parent} />
                    <Text style={Styles.log_home_title}>{this.state.selectedDateDisplayed}</Text>
                    {!this.state.isNoRecord &&
                        (<View style={{ marginBottom: 20 }}>
                            <View style={Styles.divider_parent} />
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
                            <View style={Styles.divider_child} />
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
                            <View style={Styles.divider_parent} />
                        </View>)
                    }
                    {this.state.isNoRecord && (
                        <View style={Styles.container_center_top}>
                            <Text style={{ marginBottom: 20 }}>No record </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        )
    }
}


// const a = {
//     "accessibilityLabel": " Saturday 6 November 2021 ", "children": 6, "date": {
//         "dateString": "2021-11-06", "day": 6, "month": 11, "timestamp": 1636156800000,
//         "year": 2021
//     }, "dayComponent": [Function dayComponent], "marking": undefined, "onLongPress": [Function anonymous], "onPress": [Function anonymous], "state": "disabled", "testID": "native.calendar.SELECT_DATE_SLOT-2021-11-06"
// }