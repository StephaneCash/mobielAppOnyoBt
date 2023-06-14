import React, { useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsBottom from '../pages/tabs';
import VideoPlayer from '../pages/videos/VideoPlayer';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import { ContextApp } from '../context/AuthContext';
import EditUser from '../pages/profil/EditUser';
import AddVideo from '../pages/videos/AddVideo';
import RechargeCompte from '../components/recharge/RechargeCompte';
import { useDispatch } from 'react-redux';
import { getCompteByUserId } from '../reducers/Compte.reducer';


const Stack = createNativeStackNavigator();

const Routes = () => {

    const { userConnected, fullDataUserConnected } = useContext(ContextApp);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompteByUserId(fullDataUserConnected && fullDataUserConnected._id));
    }, [fullDataUserConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='login'
                screenOptions={{ headerShown: false }}
            >

                {
                    userConnected && userConnected.token ? (
                        <>
                            <Stack.Screen name="home" component={TabsBottom} />
                            <Stack.Screen name="videoPlayer" component={VideoPlayer} />
                            <Stack.Screen name="settings/profil" component={EditUser} />
                            <Stack.Screen name="videos/add" component={AddVideo} />
                            <Stack.Screen name="editprofil" component={EditUser} />
                            <Stack.Screen name="rechargeCompte" component={RechargeCompte} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="login" component={Login} />
                            <Stack.Screen name="signup" component={SignUp} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer >
    )

}

export default Routes