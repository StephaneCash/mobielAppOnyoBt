import { View, Text, StyleSheet, Alert, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import UserChat from './UserChat';
import Contacts from './Contacts';

const Messages = ({ navigation }) => {

    const [users, setUsers] = useState([]);

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
    }, [navigation]);

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

            <ScrollView horizontal={true} style={{ backgroundColor: "#fff", marginTop: 10, }} showsVerticalScrollIndicator={false}>
                <Pressable style={styles.containerHoriz}>
                    {
                        users && users.map((item, index) => {
                            return <Contacts key={index} item={item} />
                        })
                    }
                </Pressable>
            </ScrollView>

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