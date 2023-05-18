import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../bases/basesUrl';

export const ContextApp = createContext();

const ContextAppGlobal = ({ children }) => {

    const [userConnected, setUserConnected] = useState(null);
    const [fullDataUserConnected, setFullDataUserConnected] = useState(null);
    const [compteUser, setCompteUser] = useState(null);

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

    const getCompteUser = async () => {
        axios.get(`${baseUrl}/comptes/${userConnected && userConnected.user}`)
            .then(res => {
                setCompteUser(res.data);
            })
            .catch(err => {
                console.log(err, " ERREUR")
            })
    }

    useEffect(() => {
        getUserConnected();
    }, []);

    useEffect(() => {
        if (userConnected && userConnected.user) {
            getUserById();
            getCompteUser();
        }
    }, [userConnected]);
    console.log( " __________________________________________________")

    console.log(userConnected , " USER")

    console.log( " __________________________________________________")
    

    return (
        <ContextApp.Provider
            value={{
                userConnected, setUserConnected, fullDataUserConnected, compteUser
            }}
        >
            {children}
        </ContextApp.Provider>
    )
}

export default ContextAppGlobal