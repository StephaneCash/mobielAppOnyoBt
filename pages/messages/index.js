import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import UserChat from './UserChat';
import Contacts from './Contacts';
import { ContextApp } from '../../context/AuthContext';

const Messages = ({ navigation }) => {

    const { fullDataUserConnected } = useContext(ContextApp);
    const userId = fullDataUserConnected && fullDataUserConnected._id;

    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(baseUrl + "/users");
            setUsers(data);
        } catch (error) {
            console.log("Erreur getAllUsers", error)
        }
    };

    useEffect(() => {
        getAllUsers()
    }, [navigation]);

    const handleHistoriques = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/historiques/${userId}`);
            navigation.navigate('historique', { data })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottomWidth: .8,
                    borderBottomColor: "#fff",
                    backgroundColor: "#fff"
                }}
            >
                <View
                    style={{
                        backgroundColor: "#ddd",
                        width: 50,
                        height: 50,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 25
                    }}
                >
                    <Icon
                        name='plus'
                        size={25}
                        color={'#333'}
                        style={{ fontWeight: "bold" }}
                    />
                </View>
                <TouchableOpacity onPress={() => handleHistoriques()}>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#333"
                        }}
                    >Historiques</Text>
                </TouchableOpacity>
                <MaterialIcons
                    name='search'
                    size={30}
                    color={'#444'}
                />
            </View>

            <ScrollView horizontal={true} style={{ backgroundColor: "#fff", marginTop: 10, }} showsVerticalScrollIndicator={false}>
                <Pressable style={styles.containerHoriz}>
                    {
                        users && users.map((item, index) => {
                            return <Contacts key={index} item={item} />
                        })
                    }
                </Pressable>
            </ScrollView>

            {
                users && users.length === 0 && <View style={{ backgroundColor: '#fff' }}>
                    <ActivityIndicator color={"red"} size={30} />
                </View>
            }

            <ScrollView style={{ backgroundColor: "#fff", marginTop: 10 }} showsVerticalScrollIndicator={false}>
                <Pressable style={styles.container}>
                    {
                        users && users.map((item, index) => {
                            return <UserChat key={index} item={item} />
                        })
                    }
                </Pressable>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHoriz: {
        flex: 1,
        flexDirection: "row"
    }
    , icon
        : {
        height: 42,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "silver",
        padding: 10,
        width: "70%",
        color: "#000"
    }
})

export default Messages