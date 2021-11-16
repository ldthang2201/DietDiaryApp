import React, { Component } from "react";
import { Text, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import PrimaryButton from "../../components/PrimaryButton"
import PushNotification from "react-native-push-notification";

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

    pushNotification = async () => {
        // PushNotification.localNotification({
        //     channelId: "test-channel",
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        //   });
        // PushNotification.localNotificationSchedule({
        //     channelId: "test-channel",
        //     date: new Date(Date.now() + 10000),
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        //     repeatType: "minute"
        // })
        PushNotification.cancelAllLocalNotifications();
    }

    render() {
        console.log("asd")
        return (<View style = {Styles.container_base}>
            <Text style = {{marginTop: 50}}>hellosadsd</Text>
            <PrimaryButton title = "Click" onPress = {() => {this.pushNotification()}}/>
        </View>)
    }
}