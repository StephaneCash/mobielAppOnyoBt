import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsBottom from '../pages/tabs';
import Search from '../components/search/Search';
import VideoPlayer from '../pages/videos/VideoPlayer';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='home'
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="home" component={TabsBottom} />
                <Stack.Screen name="search" component={Search} />
                <Stack.Screen name="videoPlayer" component={VideoPlayer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes