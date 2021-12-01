/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ReminderScreen from './ui/notification/ReminderScreen';
import PushNotification from "react-native-push-notification";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },

    requestPermissions: Platform.OS === 'ios'
  });

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
