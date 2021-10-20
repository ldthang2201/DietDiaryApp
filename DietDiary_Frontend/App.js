import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './ui/account/LoginScreen';
import RegisterInfoScreen from './ui/account/RegisterInfoScreen';
import SigninScreen from './ui/account/SignupScreen';
import AccountConnectScreen from './ui/AccountConnectScreen';
import GetStartedScreen from './ui/GetStartedScreen';
import SplashScreen from './ui/SplashScreen';

const screenUtils = require('./utils/ScreenNames')
const Stack = createNativeStackNavigator();

export default function App() {
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
          screenOptions = {{headerTitleAlign: 'center'}}>
          <Stack.Screen name={screenUtils.AccountConnectScreen}
            component={AccountConnectScreen}
            options = {{title: 'Account Connect'}}/>
            <Stack.Screen name={screenUtils.LoginScreen}
            component={LoginScreen}
            options = {{title: 'Log in'}} />
            <Stack.Screen name={screenUtils.SigninScreen}
            component={SigninScreen}
            options = {{title: 'Register Account'}} />
            <Stack.Screen name={screenUtils.RegisterInfoScreen}
            component={RegisterInfoScreen}
            options = {{title: 'Register Information'}} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

