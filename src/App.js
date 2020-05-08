import React from "react"
import {
  createAppContainer,
  createSwitchNavigator,
  getActiveChildNavigationOptions
} from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"

import { Image, View } from "react-native"
import TabBarIcon from "./components/TabBarIcon"
import Colors from "./styles/Colors"
import { headerStyle, headerTitleStyle, tabBarOptions } from "./styles"

import LaunchScreen from "./screens/LaunchScreen"
import ProfileScreen from "./screens/ProfileScreen"

import Onboarding1Screen from "./screens/Onboarding1Screen"
import Onboarding2Screen from "./screens/Onboarding2Screen"

import CallKeypadScreen from "./screens/CallKeypadScreen"
import CallDetailScreen from "./screens/CallDetailScreen"
import CallDetailEditScreen from "./screens/CallDetailEditScreen"
import CallEndedScreen from "./screens/CallEndedScreen"

import LeadListScreen from "./screens/LeadListScreen"
import LeadDetailScreen from "./screens/LeadDetailScreen"
import LeadDetailEditScreen from "./screens/LeadDetailEditScreen"
import LeadNewScreen from "./screens/LeadNewScreen"

const defaultNavigationOptions = () => ({ headerStyle, headerTitleStyle })

const LeadStack = createStackNavigator({
  LeadList: LeadListScreen,
  LeadDetail: LeadDetailScreen,
  LeadDetailEdit: LeadDetailEditScreen,
  LeadNew: LeadNewScreen
}, {
  initialRouteName: "LeadList",
  headerLayoutPreset: "left",
  defaultNavigationOptions,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        fgColor={tintColor}
        iconName="inbox"
      />
    )
  }
})

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
}, {
  initialRouteName: "Profile",
  headerLayoutPreset: "left",
  defaultNavigationOptions,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        fgColor={tintColor}
        iconName="user"
      />
    )
  }
})

const CallStack = createStackNavigator({
  CallKeypad: CallKeypadScreen,
  CallDetail: CallDetailScreen,
  CallDetailEdit: CallDetailEditScreen,
  CallEnded: CallEndedScreen
}, {
  initialRouteName: "CallKeypad",
  headerLayoutPreset: "left",
  defaultNavigationOptions,
  navigationOptions: ({ navigation, screenProps }) => ({
    tabBarIcon: () => (
      <View style={{
        backgroundColor: Colors.primary,
        padding: 18,
        borderRadius: 30
      }}>
        <Image
          style={{ width: 20, height: 20 }}
          source={require("./assets/keypad.png")}
        />
      </View>
    ),
    ...getActiveChildNavigationOptions(navigation, screenProps)
  })
})

const AppTabs = createBottomTabNavigator({
  Lead: LeadStack,
  Call: CallStack,
  Profile: ProfileStack
}, {
  initialRouteName: "Lead",
  tabBarOptions
})

const OnboardingStack = createStackNavigator({
  Onboarding1: Onboarding1Screen,
  Onboarding2: Onboarding2Screen
}, {
  initialRouteName: "Onboarding1",
  defaultNavigationOptions
})

const App = createSwitchNavigator({
  Onboarding: OnboardingStack,
  App: AppTabs,
  Launch: LaunchScreen
}, {
  initialRouteName: "Launch"
})

export default createAppContainer(App)
