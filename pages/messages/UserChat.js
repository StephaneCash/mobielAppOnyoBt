import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Avatar } from "@react-native-material/core";
import { baseUrl, baseUrlFile, baseUrlSocket } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/Entypo';
import { ContextApp } from '../../context/AuthContext';
import axios from 'axios';
import {io} from "socket.io-client"

const UserChat = ({ item, route }) => {

    const [msgs, setMsgs] = useState([]);

    const navigation = useNavigation();
    const urlImage = item && item.url;

    const { fullDataUserConnected } = useContext(ContextApp);
    const userIdConnected = fullDataUserConnected && fullDataUserConnected._id;

    const socket  = useRef()

    useEffect(() => {
        if(userIdConnected){
            socket.current = io(baseUrlSocket);
            socket.current.emit('add-user', userIdConnected)
        }
    }, [userIdConnected]);

    const fetchMessagesSenderAndRecepient = async () => {
        try {
            const { data } = await axios.
                get(`${baseUrl}/messages/${userIdConnected}/${item && item._id}`);
            setMsgs(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchMessagesSenderAndRecepient()
    }, []);

    const getLastMsgs = () => {
        const usersMsgs = msgs && msgs.length > 0 && msgs.filter((msg) => !msg.imageUrl);
        const n = usersMsgs && usersMsgs.length;

        return usersMsgs[n - 1];
    };

    const lastMsgs = getLastMsgs();

    const formatTime = (time) => {
        let options = {
            hour: "2-digit", minute: "2-digit",
        };

        let timestamp = Date.parse(time);
        let dateParse = new Date(timestamp).toLocaleDateString('fr-FR', options);

        const dateSplit = dateParse.toString()
        return dateSplit && dateSplit.split(',')[1];
    };

    return (
        <Pressable
            onPress={() => navigation.navigate('chat', {
                recepientId: item._id, 
            })}
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderBottomColor: "#D0D0D0",
                padding: 10,
            }}>
            <Avatar style={{ backgroundColor: "#eee" }} tintColor='#fff' icon={<FontAwesome name='user' color={"silver"} size={28} />}
                size={50} color='#fff'
                image={{ uri: baseUrlFile + "/" + urlImage }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "#222" }}>{item.pseudo}</Text>
                {
                    lastMsgs && (
                        <Text style={{ marginTop: 3, color: "gray" }}>
                            {lastMsgs.messageText}
                        </Text>
                    )
                }

            </View>
            <View>
                <Text style={{ color: "#585858", fontWeight: "400", fontSize: 11 }}>
                    {formatTime(lastMsgs && lastMsgs.timestamps)}
                </Text>
            </View>
        </Pressable>
    )
}

export default UserChat