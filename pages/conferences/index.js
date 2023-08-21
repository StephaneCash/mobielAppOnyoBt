import {
    FlatList, View,
    StyleSheet,
    Text,
    TextInput, Platform,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Contact from './Contact';
import Loader from '../videos/Loader';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ContextApp } from '../../context/AuthContext';

const Conferences = ({ route }) => {

    const navigation = useNavigation()

    const [users, setUsers] = useState([]);
    const [userConnected, setUserConnected] = useState();


    const [dataContacts, setDataContacts] = useState([]);

    const { fullDataUserConnected } = useContext(ContextApp);

    const contactsSorted = userConnected && userConnected.numsRep;

    const getOneUser = async () => {
        try {
            let { data } = await axios.get(`${baseUrl}/users/${fullDataUserConnected && fullDataUserConnected._id}`)
            setUserConnected(data)
        } catch (error) {
            console.log(error)
        }
    };

    const getAllUsers = async () => {
        try {
            let { data } = await axios.get(`${baseUrl}/users`)
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getOneUser();
        getAllUsers();
    }, []);

    useEffect(() => {
        const arr = [];
        users && users.length > 0 && users.map(val => {
            return contactsSorted && contactsSorted.map(num => {
                if (val._id === num.contactId) {
                    const value = {};
                    value.nom = num.contactNom;
                    value.email = num.contactEmail;
                    value.url = val.url;
                    value._id = val._id;
                    return arr.push(value)
                } else {
                    return null;
                }
            })
        })
        setDataContacts(arr);
    }, [contactsSorted, users]);

    useEffect(() => {
        getOneUser();
        getAllUsers();
    }, [route]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    getAllUsers();
                    getOneUser();
                }}>
                    <Text style={styles.header}>
                        Actualiser
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 30
                    }}
                >
                    <Icon
                        name='list'
                        size={25}
                        color={'#333'}
                        style={{ fontWeight: "bold" }}
                    />

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>
                        <Icon
                            name='plus'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                            onPress={() => navigation.navigate('newContact', 
                            { getAllUsers: getAllUsers, getOneUser: getOneUser })}
                        />

                        <Icon
                            name='search'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                            onPress={() => navigation.navigate('newContact')}
                        />

                        <Icon
                            name='more-vertical'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                            onPress={() => navigation.navigate('newContact')}
                        />
                    </View>
                </View>
                {
                    dataContacts ?
                        <FlatList
                            data={dataContacts}
                            renderItem={(contact) => {
                                return (
                                    <Contact
                                        key={contact._id}
                                        item={contact}
                                    />
                                );
                            }}
                            keyExtractor={(item) => item._id}
                        />
                        : <Loader />
                }
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2366af',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
        height: 70,
        verticalAlign: "middle",
        marginBottom: 30
    },
    searchBar: {
        backgroundColor: '#fff',
        color: "#000",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 30,
        paddingVertical: Platform.OS === 'android' ? undefined : 15,
    },
});
export default Conferences