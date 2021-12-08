/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ReminderScreen from './ui/notification/ReminderScreen';
import PushNotification from "react-native-push-notification";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { NotificationService } from './services/NotificationService';

// Configure Notification
NotificationService.configurePushNotification();

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
