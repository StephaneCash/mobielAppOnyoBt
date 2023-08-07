import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl, baseUrlFile } from '../../bases/basesUrl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@react-native-material/core";

const ListFollewers = ({ route }) => {

    const navigation = useNavigation();
    const user = route && route.params && route.params && route.params.user;
    const followers = route && route.params && route.params && route.params.user && route.params.user.followers;
    console.log(followers, " ROUTES USER ");

    const [users, setUsers] = useState([]);
    const [foll, setFoll] = useState([]);

    const [tab, setTab] = useState(1);

    const getAllUsers = async () => {
        try {
            let listUsers = await axios.get(`${baseUrl}/users`);
            setUsers(listUsers && listUsers.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [user, tab]);

    useEffect(() => {
        const arr = [];
        users && users.length > 0 && users.map(val => {
            return followers && followers.map(follow => {
                if (val._id === follow) {
                    arr.push(val)
                }
            })
        });
        setFoll(arr);
    }, [users, tab]);

    console.log(foll, " USERS ")

    return (
        <View style={styles.mainDIv}>
            <View style={styles.main1}>
                <TouchableOpacity onPress={() => navigation.navigate('profil', { user: user })}>
                    <AntDesign name='arrowleft' style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.textContentMain}>{user && user.pseudo}</Text>
                <Text></Text>
            </View>

            <View style={styles.main2}>
                <TouchableOpacity onPress={() => setTab(0)}>
                    <Text style={{
                        fontSize: 15,
                        color: tab === 0 ? "black" : '#666',
                        paddingBottom: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: tab === 0 ? 1 : 0
                    }}>Suivis {user && user.following && user.following.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(1)}>
                    <Text style={{
                        fontSize: 15,
                        color: tab === 1 ? "black" : '#666',
                        paddingBottom: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: tab === 1 ? 1 : 0
                    }}>Followers {user && user.following && user.followers.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(2)}>
                    <Text style={{
                        fontSize: 15,
                        color: tab === 2 ? "black" : '#666',
                        paddingBottom: 10,
                        borderBottomColor: "black",
                        borderBottomWidth: tab === 2 ? 1 : 0
                    }}>Suggérés</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.main3}>
                {
                    tab === 0 ?
                        <Text style={styles.textItem}>{user && user.following && user.following.length} suivis</Text> :
                        tab === 1 ? <FlatList
                            data={foll}
                            style={{ marginBottom: 10, }}
                            renderItem={({ item }) => {
                                return <View style={styles.viewMainItem}>
                                    <View style={styles.item}>
                                        <Avatar label={item && item.pseudo && item.pseudo} size={60} color='#fff'
                                            style={styles.avatar}
                                            image={{ uri: baseUrlFile + "/" + item.url }} />
                                        <View style={styles.itemView}>
                                            <Text style={styles.textItem}>{item.pseudo}</Text>
                                            <Text style={styles.text2Item}>@{item.pseudo}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={{ padding: 7, backgroundColor: 'crimson', borderRadius: 5 }}
                                    >
                                        <Text style={{
                                            textAlign: "center", color: "#fff", fontSize: 15
                                        }}>
                                            Suivre en retour
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }}

                            keyExtractor={(item) => item && item._id}
                        /> : ""
                }

            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    mainDIv: {
        flex: 1,
        padding: 10
    },
    main1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    icons: {
        fontSize: 25,
        color: '#222'
    },
    textContentMain: {
        fontSize: 20,
        color: '#222'
    },
    main2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    text2Main: {
        fontSize: 15,
        color: '#666',
        marginBottom: 10
    },
    main3: {
        padding: 5
    },
    avatar: {
        marginTop: 10,
        backgroundColor: '#ddd'
    },
    viewMainItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    textItem: {
        fontSize: 16,
        color: '#333'
    },
    itemView: {
        flexDirection: "column",
        gap: 2
    },
    text2Item: {
        fontSize: 13,
        color: '#666'
    }
})

export default ListFollewers