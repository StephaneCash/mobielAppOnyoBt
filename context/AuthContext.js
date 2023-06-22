import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../bases/basesUrl';
import { useDispatch } from 'react-redux';
import { getCompteByUserId } from '../reducers/Compte.reducer';
import { getOneUser } from '../reducers/UserOne.reducer';

export const ContextApp = createContext();

const ContextAppGlobal = ({ children }) => {

    const [userConnected, setUserConnected] = useState(null);
    const [fullDataUserConnected, setFullDataUserConnected] = useState(null);

    const dispatch = useDispatch()

    const getUserConnected = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userConnected')
            setUserConnected(JSON.parse(jsonValue))
        } catch (e) {
            console.log(e);
        }
    }

    const getUserById = async () => {
        if (userConnected && userConnected.user) {
            axios.get(`${baseUrl}/users/${userConnected && userConnected.user}`)
                .then(res => {
                    setFullDataUserConnected(res.data)
                })
                .catch(err => {
                    console.log(err, " ERREUR")
                })
        }
    }

    useEffect(() => {
        getUserConnected();
    }, []);

    useEffect(() => {
        if (userConnected && userConnected.user) {
            getUserById();
            dispatch(getCompteByUserId(userConnected && userConnected.user))
            dispatch(getOneUser(userConnected && userConnected.user))
        }
    }, [userConnected]);

    return (
        <ContextApp.Provider
            value={{
                userConnected, setUserConnected, fullDataUserConnected,
            }}
        >
            {children}
        </ContextApp.Provider>
    )
}

export default ContextAppGlobal