import PushNotification from 'react-native-push-notification';
import { calculateDaysFromNow, getDisplayTime, getDisplayTimeByHourMin, getDurationFromNow } from '../utils/DatetimeUtls';

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
    getAllNotification: () => {
        // PushNotification.allNotification
        PushNotification.getScheduledLocalNotifications((result) => console.log(result));
    },
    /**
     * Delete channel by Id
     * @param {*} channelId 
     */
    deleteChannel: (channelId) => {
        PushNotification.deleteChannel(channelId);
    },
    /**
     * Cancel all notification
     */
    cancelAllLocalNotifications: () => {
        PushNotification.cancelAllLocalNotifications();
    },
    /**
     * Cancel notification by Id
     * @param {*} notificationId 
     */
    cancelNotification: (notificationId) => {
        PushNotification.cancelLocalNotification(notificationId);
    },
    /**
     * Create notification for eating
     * @param {*} hour 
     * @param {*} minute 
     */
    createEatNotification: async (id, hour, minute) => {
        const today = new Date();
        let date = today.getDate();
        if (getDisplayTime(today) > getDisplayTimeByHourMin(hour, minute)) {
            date++;
        }

        const scheduleDate = new Date(today.getFullYear(), today.getMonth(), date, hour, minute);

        NotificationService.createChannel(NotificationService.eatingId, NotificationService.eatingChannel);

        PushNotification.localNotificationSchedule({
            id: id,
            title: "Take your meal",
            message: `It's ${getDisplayTimeByHourMin(hour, minute)}. Time to take and enjoy your meal!`,
            channelId: NotificationService.eatingId,
            small_icon: "ic_launcher",
            repeatType: 'day',
            date: scheduleDate,
            allowWhileIdle: true,
            actions: NotificationService.eatingAction,
        })
    },
    /**
     * Create notification for do exercise
     * @param {*} hour 
     * @param {*} minute 
     */
    createExerciseNotification: (id, hour, minute) => {
        const today = new Date();
        let date = today.getDate();
        if (getDisplayTime(today) > getDisplayTimeByHourMin(hour, minute)) {
            date++;
        }

        const scheduleDate = new Date(today.getFullYear(), today.getMonth(), date, hour, minute);

        NotificationService.createChannel(NotificationService.exerciseId, NotificationService.exerciseChannel);

        PushNotification.localNotificationSchedule({
            id: id,
            title: "Do Exercise",
            message: `It's ${getDisplayTimeByHourMin(hour, minute)}. Time to do exercise and improve your health`,
            channelId: NotificationService.exerciseId,
            small_icon: "ic_launcher",
            repeatType: 'day',
            date: scheduleDate,
            allowWhileIdle: true,
            actions: NotificationService.exerciseAction,
        })
    },
    /**
     * Create notification for weighing
     * @param {*} hour 
     * @param {*} minute 
     */
    createWeighNotification: (id, hour, minute) => {
        const today = new Date();
        let date = today.getDate();
        if (getDisplayTime(today) > getDisplayTimeByHourMin(hour, minute)) {
            date++;
        }

        const scheduleDate = new Date(today.getFullYear(), today.getMonth(), date, hour, minute);

        if (today > scheduleDate) {
            scheduleDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, hour, minute);
        }

        NotificationService.createChannel(NotificationService.weightId, NotificationService.weightChannel);

        PushNotification.localNotificationSchedule({
            id: id,
            title: "Weighing time",
            message: `How much do you weigh today? Weighing now`,
            channelId: NotificationService.weightId,
            small_icon: "ic_launcher",
            repeatType: 'day',
            date: scheduleDate,
            allowWhileIdle: true,
        })
    },
    
}