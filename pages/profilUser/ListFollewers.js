import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl, baseUrlFile } from '../../bases/basesUrl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@react-native-material/core";
import { ContextApp } from '../../context/AuthContext';

const ListFollewers = ({ route }) => {

    const navigation = useNavigation();
    const userProfil = route && route.params && route.params && route.params.user;
    const followers = route && route.params && route.params && route.params.user 
    && route.params.user.followers;

    const following = route && route.params && route.params && route.params.user 
    && route.params.user.following;

    const [users, setUsers] = useState([]);
    const [foll, setFoll] = useState([]);
    const [follW, setFollW] = useState([]);


    const [user, setUser] = useState()
    const [userConnected, setUserConnected] = useState()

    const [tab, setTab] = useState(1);

    const { fullDataUserConnected } = useContext(ContextApp);

    const getAllUsers = async () => {
        try {
            let listUsers = await axios.get(`${baseUrl}/users`);
            setUsers(listUsers && listUsers.data);
        } catch (error) {
            console.log(error)
        }
    };

    const getOneUser = async (itemUser) => {
        try {
            const { data } = await axios.get(`${baseUrl}/users/${itemUser && itemUser._id}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getOneUserConnected = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/users/${fullDataUserConnected
                && fullDataUserConnected._id}`);
            setUserConnected(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOneUserConnected();
    }, [fullDataUserConnected]);

    useEffect(() => {
        getOneUser(userProfil);
    }, [userProfil]);

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

    useEffect(() => {
        const arr = [];
        users && users.length > 0 && users.map(val => {
            return following && following.map(follow => {
                if (val._id === follow) {
                    arr.push(val)
                }
            })
        });
        setFollW(arr);
    }, [users, tab]);

    const followUser = async (item) => {
        try {
            await
                axios.patch(`${baseUrl}/users/follow/${userConnected && userConnected._id}`, {
                    idToFollow: item && item._id
                });
            getOneUser(userProfil);
            getOneUserConnected();
        } catch (error) {
            console.log(error);
        }
    };

    const unFollowUser = async (item) => {
        try {
            await
                axios.patch(`${baseUrl}/users/unFollowUser/${userConnected && userConnected._id}`, {
                    idToUnfollow: item && item._id
                });
            getOneUser(userProfil);
            getOneUserConnected();
        } catch (error) {
            console.log(error);
        }
    };

    const isFollow = user && user.followers && user.followers.includes(userConnected && userConnected._id);
    console.log(isFollow, " USER CONNECTED")

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
                        <FlatList
                            data={follW}
                            style={{ marginBottom: 10, }}
                            renderItem={({ item }) => {
                                return <View style={styles.viewMainItem}>
                                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('profil', { user: item })}>
                                        <Avatar label={item && item.pseudo && item.pseudo} size={60} color='#fff'
                                            style={styles.avatar}
                                            image={{ uri: baseUrlFile + "/" + item.url }} />
                                        <View style={styles.itemView}>
                                            <Text style={styles.textItem}>{item.pseudo}</Text>
                                            <Text style={styles.text2Item}>@{item.pseudo}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {
                                        item && userConnected && item._id === userConnected._id ?
                                            <TouchableOpacity
                                                style={{
                                                    borderColor: "silver",
                                                    borderWidth: 1,
                                                    backgroundColor: 'silver',
                                                    padding: 7,
                                                    borderRadius: 5
                                                }}
                                            >
                                                <Text style={styles.text2Item}>Vous</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                style={{
                                                    padding: 7, backgroundColor: 'crimson',
                                                    borderRadius: 5, width: "40%",
                                                }}
                                                onPress={() => {
                                                    item && item.followers &&
                                                        item.followers
                                                            .includes(userConnected && userConnected._id) ?
                                                        unFollowUser(item) : followUser(item)
                                                }
                                                }
                                            >
                                                {
                                                    item && item.followers &&
                                                        item.followers
                                                            .includes(userConnected && userConnected._id)
                                                        ?
                                                        <Text style={{
                                                            textAlign: "center", color: "#fff", fontSize: 15
                                                        }}>Ne plus suivre </Text>
                                                        :
                                                        <Text style={{
                                                            textAlign: "center", color: "#fff", fontSize: 15
                                                        }}>Suivre </Text>

                                                }
                                            </TouchableOpacity>
                                    }
                                </View>
                            }}
                            keyExtractor={(item) => item && item._id}
                        />
                        :
                        tab === 1 ? <FlatList
                            data={foll}
                            style={{ marginBottom: 10, }}
                            renderItem={({ item }) => {
                                return <View style={styles.viewMainItem}>
                                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('profil', { user: item })}>
                                        <Avatar label={item && item.pseudo && item.pseudo} size={60} color='#fff'
                                            style={styles.avatar}
                                            image={{ uri: baseUrlFile + "/" + item.url }} />
                                        <View style={styles.itemView}>
                                            <Text style={styles.textItem}>{item.pseudo}</Text>
                                            <Text style={styles.text2Item}>@{item.pseudo}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {
                                        item && userConnected && item._id === userConnected._id ?
                                            <TouchableOpacity
                                                style={{
                                                    borderColor: "silver",
                                                    borderWidth: 1,
                                                    backgroundColor: 'silver',
                                                    padding: 7,
                                                    borderRadius: 5
                                                }}
                                            >
                                                <Text style={styles.text2Item}>Vous</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                style={{
                                                    padding: 7, backgroundColor: 'crimson',
                                                    borderRadius: 5, width: "40%",
                                                }}
                                                onPress={() => {
                                                    item && item.followers &&
                                                        item.followers
                                                            .includes(userConnected && userConnected._id) ?
                                                        unFollowUser(item) : followUser(item)
                                                }
                                                }
                                            >
                                                {
                                                    item && item.followers &&
                                                        item.followers
                                                            .includes(userConnected && userConnected._id)
                                                        ?
                                                        <Text style={{
                                                            textAlign: "center", color: "#fff", fontSize: 15
                                                        }}>Ne plus suivre </Text>
                                                        :
                                                        <Text style={{
                                                            textAlign: "center", color: "#fff", fontSize: 15
                                                        }}>Suivre </Text>

                                                }
                                            </TouchableOpacity>
                                    }
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