import PushNotification from 'react-native-push-notification';
import { calculateDaysFromNow, getDurationFromNow } from '../utils/DatetimeUtls';

export const NotificationService = {
    eatingChannel: "eating-channel",
    eatingId: "eat",
    eatingAction: "eating",
    exerciseChannel: "exercise-channel",
    exerciseId: "exercise",
    exerciseAction: "doExercise",
    weightChannel: "weight-channel",
    weightId: "weight",
    configurePushNotification: () => {
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            },

            requestPermissions: Platform.OS === 'ios'
        });
    },
    createChannel: (channelId, channelName) => {
        PushNotification.channelExists(channelId, (exists) => {
            if (!exists) {
                PushNotification.createChannel({
                    channelId: channelId,
                    channelName: channelName,
                });
            }
        });
    },
    deleteChannel: (channelId) => {
        PushNotification.deleteChannel(channelId);
    },
    cancelAllLocalNotifications: () => {
        PushNotification.cancelAllLocalNotifications();
    },
    createLocalScheduleNotification: () => {

    },
    createTestNotification: async (hour, minute) => {
        const today = new Date();
        const scheduleDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
        const alarmNotifData = {
            title: "My Notification Title",
            message: "My Notification Message",
            channelId: "test-channel",
            small_icon: "ic_launcher",
        
            // You can add any additional data that is important for the notification
            // It will be added to the PendingIntent along with the rest of the bundle.
            // e.g.
            data: { foo: "bar" },
        };

        PushNotification.cancelAllLocalNotifications();

        PushNotification.channelExists("test-channel", (e) => console.log(e));

        PushNotification.localNotificationSchedule(
            {
                ...alarmNotifData,
                date: scheduleDate,
                repeatType: 'date'
            }
        )

        // PushNotification.localNotification(alarmNotifData)

        // if (getDurationFromNow > 0) {
        //     PushNotification.localNotificationSchedule(
        //         {
        //             ...alarmNotifData,
        //             date: scheduleDate,
        //             repeatType: 'minute'
        //         }
        //     )
        // } else {
        //     PushNotification.localNotificationSchedule({
        //         ...alarmNotifData,
        //         date: today,
        //         repeatType: 'minute'
        //     })
        // }
    }
}