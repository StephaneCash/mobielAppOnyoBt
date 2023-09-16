import React, { useContext, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Messages from '../messages';
import Settings from '../settings';
import Videos from '../videos';
import Conferences from '../conferences';
import { useNavigation } from '@react-navigation/native';
import { ContextApp } from '../../context/AuthContext';

const Tab = createMaterialBottomTabNavigator();

const TabsBottom = () => {

  const navigateion = useNavigation()
  const { socket } = useContext(ContextApp);

  useEffect(() => {
    socket.on("newAppelEntrant", (data) => {
      navigateion.navigate('voiceCall', {
        called: data.called,
        caller: data.caller,
      });
    });
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
      initialRouteName="tabs_home"
      barStyle={{ backgroundColor: '#fff', borderTopColor: "silver", borderTopWidth: 1 }}
      activeColor='#000'
      inactiveColor='#000'
    >
      <Tab.Screen
        name="tabs_home"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"#333"} size={25} />
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
            <MaterialCommunityIcons name="chat" color={"#333"} size={25} />
          ),
          tabBarBadge: 0,

        }}
      />

      <Tab.Screen
        name="videos"
        component={Videos}
        options={{
          tabBarLabel: 'Vidéos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="animation-play" color={"#333"} size={25} />
          ),
          tabBarBadge: 0,
        }}
      />

      <Tab.Screen
        name="conferences"
        component={Conferences}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={"#333"} size={25} />
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
            <MaterialCommunityIcons name="account-cog" color={"#333"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsBottom