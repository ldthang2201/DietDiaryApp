import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
import SplashScreen from './ui/SplashScreen';
import GetStartedScreen from './ui/GetStartedScreen';
import AccountConnectScreen from './ui/AccountConnectScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(GetStartedScreen);
