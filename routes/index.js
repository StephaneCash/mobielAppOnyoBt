import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsBottom from '../pages/tabs';
import Search from '../components/search/Search';
import VideoPlayer from '../pages/videos/VideoPlayer';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';

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
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={SignUp} />

            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Routes