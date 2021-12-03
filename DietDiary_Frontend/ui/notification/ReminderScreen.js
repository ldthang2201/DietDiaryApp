import React, { Component } from "react";
import { EventSubscriptionVendor, ScrollView, Switch, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import PushNotification from "react-native-push-notification";
import AppLoader from "../../components/AppLoader";
import { NotificationService } from "../../services/NotificationService";
import { EATING_TYPE, EXERCISE_TYPE, getAllReminders, updateReminder, WEIGH_TYPE } from "../../databases/Reminder";


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

        this.state = {
            listEatingReminder: [],
            listExerciseReminder: [],
            listWeighReminder: [],
        }
    }

    // pushNotification = async () => {
    //     NotificationService.createTestNotification(10, 6);
    //     // PushNotification.localNotification({
    //     //     channelId: "test-channel",
    //     //     title: "My Notification Title", // (optional)
    //     //     message: "My Notification Message", // (required)
    //     // });
    // }
    _onSwitchReminder = (item) => {
        const isNotify = !item.isNotify;
        updateReminder(item, isNotify).then(() => {
            this._reloadData();
        }).catch(error => console.log(error))
    }

    _reloadData = () => {
        getAllReminders().then(result => {
            if (result) {
                let listEatingReminder = [];
                let listExerciseReminder = [];
                let listWeighReminder = [];
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
                    listEatingReminder: listEatingReminder.sort((a,b) => a.hour > b.hour),
                    listExerciseReminder: listExerciseReminder.sort((a,b) => a.hour > b.hour),
                    listWeighReminder: listWeighReminder.sort((a,b) => a.hour > b.hour),
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
                            if (listReminder.length > 1) {
                                switch (index) {
                                    case 0:
                                        styleContainer = Styles.reminder_item_top;
                                        isDivider = true;
                                        break;
                                    case (listReminder.length - 1):
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
                                        <Text style={Styles.reminder_time}>10:05</Text>
                                        <Switch 
                                            onValueChange = {() => {
                                                this._onSwitchReminder(value);
                                            }}
                                            value = {value.isNotify}/>
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
                            if (listReminder.length > 1) {
                                switch (index) {
                                    case 0:
                                        styleContainer = Styles.reminder_item_top;
                                        isDivider = true;
                                        break;
                                    case (listReminder.length - 1):
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
                                        <Text style={Styles.reminder_time}>10:05</Text>
                                        <Switch />
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
                                        <Text style={Styles.reminder_time}>10:05</Text>
                                        <Switch />
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const listReminder = [
    {
        primaryKey: 1,
        hour: 10,
        minute: 5,
        isNorify: true
    },
    {
        primaryKey: 2,
        hour: 10,
        minute: 5,
        isNorify: true
    },
    {
        primaryKey: 3,
        hour: 10,
        minute: 5,
        isNorify: true
    },
]