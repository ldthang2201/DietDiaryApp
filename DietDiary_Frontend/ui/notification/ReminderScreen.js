import React, { Component } from "react";
import { EventSubscriptionVendor, ScrollView, Switch, Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import PushNotification from "react-native-push-notification";
import AppLoader from "../../components/AppLoader";
import { NotificationService } from "../../services/NotificationService";


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
    }

    pushNotification = async () => {
        NotificationService.createTestNotification(10, 6);
        // PushNotification.localNotification({
        //     channelId: "test-channel",
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        // });
    }

    render() {
        return (
            <ScrollView>
                <View style={Styles.container_top_left_base}>

                    {/* EATING REMINDER */}
                    <Text style={Styles.reminder_title}>Eatings Reminder</Text>
                    {
                        listReminder.map((value, index) => {
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
                                <View style={{ flexDirection: 'column', width: '100%' }}>
                                    <View style={styleContainer}>
                                        <Text style={Styles.reminder_time}>10:05</Text>
                                        <Switch />
                                    </View>
                                    {isDivider && <View style={Styles.divider_child} />}
                                </View>
                            )
                        })
                    }

                    {/* DO EXERCISE REMINDER */}
                    <Text style={Styles.reminder_title}>Do Exercise Reminder</Text>
                    {
                        listReminder.map((value, index) => {
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
                                <View style={{ flexDirection: 'column', width: '100%' }}>
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
                    <View style={Styles.reminder_item_only}>
                        <Text style={Styles.reminder_time}>10:05</Text>
                        <Switch />
                    </View>
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