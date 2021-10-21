
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import LoginScreen from './ui/account/LoginScreen';
import RegisterInfoScreen from './ui/account/RegisterInfoScreen';
import SigninScreen from './ui/account/SignupScreen';
import AccountConnectScreen from './ui/AccountConnectScreen';
import GetStartedScreen from './ui/GetStartedScreen';
import SplashScreen from './ui/SplashScreen';
import HomeScreen from './ui/home/HomeScreen';
import SettingScreen from './ui/setting/SettingScreen'
import ChartScreen from './ui/chart/ChartScreen';
import LogScreen from './ui/log/LogScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from './assets/colors';
import Styles from './ui/Styles';

const screenUtils = require('./utils/ScreenNames')
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screenUtils.SplashScreen}
          component={SplashScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name={screenUtils.GetStartedScreen}
          component={GetStartedScreen}
          options={{ headerShown: false }} />
        <Stack.Group
          screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name={screenUtils.AccountConnectScreen}
            component={AccountConnectScreen}
            options={{ title: 'Account Connect' }} />
          <Stack.Screen name={screenUtils.LoginScreen}
            component={LoginScreen}
            options={{ title: 'Log in' }} />
          <Stack.Screen name={screenUtils.SigninScreen}
            component={SigninScreen}
            options={{ title: 'Register Account' }} />
          <Stack.Screen name={screenUtils.RegisterInfoScreen}
            component={RegisterInfoScreen}
            options={{ title: 'Register Information' }} />
          <Stack.Screen name='Home'
            component={Home}
            options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: colors.secondaryColor,
        tabBarStyle: Styles.bottom_tab,
        tabBarShowLabel: false
      }}>
      <Tab.Screen name={screenUtils.HomeScreen} component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Image source={require('./assets/icons/home.png')} style={{width: 25, height: 25, tintColor: color}} />,
          tabBarLabel: 'HOME',
          title: 'Home'
        }} />
      <Tab.Screen name={screenUtils.ChartScreen} component={ChartScreen} 
      options={{
        tabBarIcon: ({color}) => <Image source={require('./assets/icons/chart.png')} style={{width: 25, height: 25, tintColor: color}} />,
        tabBarLabel: 'CHART',
        title: 'Chart'
      }}/>
      <Tab.Screen name={screenUtils.LogScreen} component={LogScreen} 
      options={{
        tabBarIcon: ({color}) => <Image source={require('./assets/icons/log.png')} style={{width: 25, height: 25, tintColor: color}} />,
        tabBarLabel: 'LOGS',
        title: 'Logs'
      }}/>
      <Tab.Screen name={screenUtils.SettingScreen} component={SettingScreen} 
      options={{
        tabBarIcon: ({color}) => <Image source={require('./assets/icons/settings.png')} style={{width: 25, height: 25, tintColor: color}} />,
        tabBarLabel: 'SETTINGS',
        title: 'Settings'
      }}/>
    </Tab.Navigator>
  );
}




export default App;
