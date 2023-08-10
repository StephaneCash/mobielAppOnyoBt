import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Messages from '../messages';
import Settings from '../settings';
import Videos from '../videos';
import Conferences from '../conferences';

const Tab = createMaterialBottomTabNavigator();

const TabsBottom = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
      initialRouteName="tabs_home"
      barStyle={{ backgroundColor: '#0e6bf7' }}
      activeColor='#fff'
      inactiveColor='#000'
    >
      <Tab.Screen
        name="tabs_home"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"#fff"} size={25} />
          ),
          tabBarOptions: {
            activeTintColor: 'red',
          },
        }}
      />
      <Tab.Screen
        name="messages"
        component={Messages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={"#fff"} size={25} />
          ),
          tabBarBadge: 1,

        }}
      />

      <Tab.Screen
        name="videos"
        component={Videos}
        options={{
          tabBarLabel: 'Vidéos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="animation-play" color={"#fff"} size={25} />
          ),
          tabBarBadge: 1,
        }}
      />

      <Tab.Screen
        name="conferences"
        component={Conferences}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={"#fff"} size={25} />
          ),
          tabBarBadge: 0,
        }}
      />

      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: 'Compte',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-cog" color={"#fff"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsBottom