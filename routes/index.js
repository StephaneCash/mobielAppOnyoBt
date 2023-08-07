import React, { useContext } from 'react'
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
import Home from '../screens/Home';
import Live from '../screens/Live';
import ProfileUser from '../pages/profilUser/ProfileUser';
import ListFollewers from '../pages/profilUser/ListFollewers';

const Stack = createNativeStackNavigator();

const Routes = () => {

    const { userConnected } = useContext(ContextApp);

    const options = { headerShown: false };

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
                            <Stack.Screen name="profil" component={ProfileUser} />
                            <Stack.Screen name="listFollowers" component={ListFollewers} />
                            <Stack.Screen name="rechargeCompte" component={RechargeCompte} />
                            <Stack.Screen name="liveHome" component={Home} options={options} />
                            <Stack.Screen name="Live" component={Live} options={options} />
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