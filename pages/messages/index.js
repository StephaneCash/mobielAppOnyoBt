import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketService from '../../utils/socketService';
import { ContextApp } from '../../context/AuthContext';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import UserChat from './UserChat';

const Messages = () => {
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socketService.initializeSocket();
    }, []);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(baseUrl + "/users");
            setUsers(data);
        } catch (error) {
            console.log("Erreur getAllUsers", error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, []);

    useEffect(() => {
        let arr = []
        socketService.on("received_message", (msg) => {
            let arrClone = [...data]
            setMessages(arrClone.concat(msg))
        })
    }, [messages]);

    const sendMessage = () => {
        if (message)
            socketService.emit("send_message", message)
        else
            Alert.alert('Entrer un msg à envoyer')
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
                    borderBottomColor: "#ddd"
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
                        size={20}
                        color={'#444'}
                        style={{fontWeight:"bold"}}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        color: "#333"
                    }}
                >Messages</Text>
                <MaterialIcons
                    name='search'
                    size={30}
                    color={'#444'}
                />
            </View>
            <ScrollView style={{backgroundColor:"#fff"}} showsVerticalScrollIndicator={false}>
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
    }, icon
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