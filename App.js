import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
 SafeAreaView,
 StatusBar,
 KeyboardAvoidingView,
 Keyboard,
 Alert,
 Animated,
 TouchableOpacity,
 AsyncStorage
} from 'react-native'
import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator } from 'react-navigation'

//screen imports
import WelcomeScreen from './src/components/screens/WelcomeScreen'
import SignUp from './src/components/screens/SignUp'
import LoginScreen from './src/components/screens/LoginScreen'
import ForgotPassword from './src/components/screens/ForgotPassword'
import AuthLoadingScreen from './src/components/screens/AuthLoadingScreen'

// App stack screen imports
import HomeScreen from './src/components/screens/HomeScreen'
import SettingsScreen from './src/components/screens/Settings'
import RestaurantScreen from './src/components/screens/Restaurant'

// Bottom Auth tabs
  const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Restaurant: {
    screen: RestaurantScreen
  },
  Settings: {
    screen: SettingsScreen
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    // Set the header icon
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Icon name='md-menu' size={24}/>
          </View>
        </TouchableOpacity>
      )
    })
  }
})
// Auth stack
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome LiveVibe: Merchants`, // for the header screen
      headerBackTitle: 'Back'
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: () => ({
      title: `Add a new restaurant`,
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: `Log in to your restaurant`,
    }),
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: () => ({
      title: `Create a new password`,
    }),
  },
})
// App stack for the drawer
const AppDrawerNavigator = createDrawerNavigator({
  Tabs: AppStackNavigator,
  Home: HomeScreen,
  Restaurant: RestaurantScreen,
  Settings: SettingsScreen
})

export default createSwitchNavigator({
  // screen: name
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,//Auth stack
  App: AppDrawerNavigator//AppStack
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
