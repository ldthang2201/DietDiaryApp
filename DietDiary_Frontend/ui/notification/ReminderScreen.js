import React, { Component } from "react";
import { Alert, EventSubscriptionVendor, ScrollView, Switch, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import PushNotification from "react-native-push-notification";
import AppLoader from "../../components/AppLoader";
import { NotificationService } from "../../services/NotificationService";
import DateTimePicker from '@react-native-community/datetimepicker';
import { EATING_TYPE, EXERCISE_TYPE, getAllReminders, updateReminderNotify, updateReminderTime, WEIGH_TYPE } from "../../databases/Reminder";
import { getDisplayTimeByHourMin } from "../../utils/DatetimeUtls";


// set the fire date for 1 second from now


const alarmNotifData = {
    title: "My Notification Title",
    message: "My Notification Message",
    channel: "my_channel_id",
    small_icon: "ic_launcher",

    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
    data: { foo: "bar" },
};

export default class ReminderScreen extends Component {

    constructor(props) {
        super(props);

        this.params = props.route.params;

        this.listAllReminder = [];

        this.state = {
            isShowTimePicker: false,
            selectedReminderId: "",
            selectedTime: new Date(), // Time show on time picker
            listEatingReminder: [],
            listExerciseReminder: [],
            listWeighReminder: [],
        }

        NotificationService.getAllNotification();
    }

    _onSwitchReminder = (item) => {
        const isNotify = !item.isNotify;
        updateReminderNotify(item, isNotify).then(() => {
            this._reloadData();
        }).catch(error => console.log(error))
    }

    _onTimePress = (item) => {
        const today = new Date();
        this.setState({
            selectedReminderId: String(item.primaryKey),
            selectedTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), item.hour, item.minute),
            isShowTimePicker: true,
        })
    }

    _onCancel = () => {
        this.setState({ isShowTimePicker: false });
    }

    _onSelectTimePicker = (event, selectedTime) => {
        if (selectedTime === undefined) {
            this._onCancel();
            return;
        }
        const selectedDate = new Date(selectedTime);
        const hour = selectedDate.getHours();
        const minute = selectedDate.getMinutes();

        const existTime = this.listAllReminder.find(item => item.primaryKey != this.state.selectedReminderId
            && item.hour == hour && item.minute == minute);
        if (existTime) {
            Alert.alert(
                'Information',
                'You can\'t set time same another reminder. Please try another time',
                [
                    {
                        text: 'OK',
                        style: 'cancel'
                    },
                ],
                { cancelable: true }
            );
            this._onCancel();
            return;
        }

        updateReminderTime(this.state.selectedReminderId, hour, minute)
            .then(() => this._reloadData()).catch(error => console.log(error));

        this._onCancel();
    }

    _reloadData = () => {
        getAllReminders().then(result => {
            if (result) {
                let listEatingReminder = [];
                let listExerciseReminder = [];
                let listWeighReminder = [];

                this.listAllReminder = result;
                result.forEach(item => {
                    switch (item.type) {
                        case EATING_TYPE:
                            listEatingReminder.push(item);
                            break;
                        case EXERCISE_TYPE:
                            listExerciseReminder.push(item)
                            break;
                        case WEIGH_TYPE:
                            listWeighReminder.push(item)
                            break;
                        default:
                            break;
                    }
                });

                this.setState({
                    listEatingReminder: listEatingReminder.sort((a, b) => a.hour > b.hour),
                    listExerciseReminder: listExerciseReminder.sort((a, b) => a.hour > b.hour),
                    listWeighReminder: listWeighReminder.sort((a, b) => a.hour > b.hour),
                })

            }
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this._reloadData();
    }

    render() {
        return (
            <ScrollView>
                <View style={Styles.container_top_left_base}>

                    {/* EATING REMINDER */}
                    <Text style={Styles.reminder_title}>Eatings Reminder</Text>
                    {
                        this.state.listEatingReminder.map((value, index) => {
                            let styleContainer = Styles.reminder_item_only;
                            let isDivider = false;
                            let length = this.state.listEatingReminder.length;
                            if (length > 1) {
                                switch (index) {
                                    case 0:
                                        styleContainer = Styles.reminder_item_top;
                                        isDivider = true;
                                        break;
                                    case (length - 1):
                                        styleContainer = Styles.reminder_item_bottom;
                                        break;
                                    default:
                                        styleContainer = Styles.reminder_item_middle;
                                        isDivider = true;
                                        break;
                                }
                            }
                            return (
                                <View style={{ flexDirection: 'column', width: '100%' }} key={index}>
                                    <View style={styleContainer}>
                                        <Text style={Styles.reminder_time} onPress={() => this._onTimePress(value)}>{getDisplayTimeByHourMin(value.hour, value.minute)}</Text>
                                        <Switch
                                            onValueChange={() => {
                                                this._onSwitchReminder(value);
                                            }}
                                            value={value.isNotify} />
                                    </View>
                                    {isDivider && <View style={Styles.divider_child} />}
                                </View>
                            )
                        })
                    }

                    {/* DO EXERCISE REMINDER */}
                    <Text style={Styles.reminder_title}>Do Exercise Reminder</Text>
                    {
                        this.state.listExerciseReminder.map((value, index) => {
                            let styleContainer = Styles.reminder_item_only;
                            let isDivider = false;
                            const length = this.state.listExerciseReminder.length;
                            if (length > 1) {
                                switch (index) {
                                    case 0:
                                        styleContainer = Styles.reminder_item_top;
                                        isDivider = true;
                                        break;
                                    case (length - 1):
                                        styleContainer = Styles.reminder_item_bottom;
                                        break;
                                    default:
                                        styleContainer = Styles.reminder_item_middle;
                                        isDivider = true;
                                        break;
                                }
                            }
                            return (
                                <View style={{ flexDirection: 'column', width: '100%' }} key={index}>
                                    <View style={styleContainer}>
                                        <Text style={Styles.reminder_time} onPress={() => this._onTimePress(value)}>{getDisplayTimeByHourMin(value.hour, value.minute)}</Text>
                                        <Switch
                                            onValueChange={() => {
                                                this._onSwitchReminder(value);
                                            }}
                                            value={value.isNotify} />
                                    </View>
                                    {isDivider && <View style={Styles.divider_child} />}
                                </View>
                            )
                        })
                    }

                    {/* WEIGHT REMINDER */}
                    <Text style={Styles.reminder_title}>Weight Reminder</Text>
                    {
                        this.state.listWeighReminder.map((value, index) => {
                            return (
                                <View style={{ flexDirection: 'column', width: '100%' }} key={index}>
                                    <View style={Styles.reminder_item_only}>
                                        <Text style={Styles.reminder_time} onPress={() => this._onTimePress(value)}>{getDisplayTimeByHourMin(value.hour, value.minute)}</Text>
                                        <Switch
                                            onValueChange={() => {
                                                this._onSwitchReminder(value);
                                            }}
                                            value={value.isNotify} />
                                    </View>
                                </View>
                            )
                        })
                    }
                    {this.state.isShowTimePicker &&
                        <DateTimePicker
                            value={this.state.selectedTime}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={this._onSelectTimePicker}
                            onTouchCancel={() => this._onCancel()} />}
                    <PrimaryButton title="Cancel all" onPress={() => {
                        NotificationService.cancelAllLocalNotifications();
                    }} />
                </View>
            </ScrollView>
        )
    }
}