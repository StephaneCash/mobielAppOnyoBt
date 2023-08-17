import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import EmojiSelector from "react-native-emoji-selector"
import { ContextApp } from '../../context/AuthContext';
import axios from 'axios';
import { baseUrl, baseUrlFile } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@react-native-material/core";
import Font from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ChatMessage = ({ route }) => {

    const navigation = useNavigation();

    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [receiveData, setReceivedata] = useState();
    const [msgs, setMsgs] = useState([]);
    const [messages, setMessages] = useState([]);

    const recepientId = route && route.params && route.params.recepientId

    const { fullDataUserConnected } = useContext(ContextApp);
    const userIdConnected = fullDataUserConnected && fullDataUserConnected._id

    const fetchMessagesSenderAndRecepient = async () => {
        try {
            const { data } = await axios.
                get(`${baseUrl}/messages/${userIdConnected}/${recepientId}`);
            setMsgs(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchMessagesSenderAndRecepient()
    }, []);

    useEffect(() => {
        const fetchUserReceive = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/users/${recepientId}`);
                setReceivedata(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserReceive();
    }, []);

    const handleEmoji = () => {
        setShowEmoji(!showEmoji);
    };

    const getAllMessages = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/messages`);
            setMessages(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSend = async () => {
        try {
            if(message){
                const formData = {}
                formData.senderId = fullDataUserConnected && fullDataUserConnected._id;
                formData.recepientId = recepientId;
                formData.messageText = message;
                const { data } = await axios.post(`${baseUrl}/messages`, formData);
    
                fetchMessagesSenderAndRecepient()
                setMessage('');
            }
            
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const urlImage = receiveData && receiveData.url;

    const formatTime = (time) => {
        let options = {
            hour: "2-digit", minute: "2-digit",
        };

        let timestamp = Date.parse(time);
        let dateParse = new Date(timestamp).toLocaleDateString('fr-FR', options);

        const dateSplit = dateParse.toString()

        return dateSplit && dateSplit.split(',')[1];
    };

    const pickImage = async () =>{
       
    }   

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#D0D0D0" }}>
            <View
                style={{
                    top: 0,
                    backgroundColor: "#fff",
                    padding: 10,
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <TouchableOpacity >
                        <Icon name='arrowleft' size={24} color={'#333'} onPress={() => navigation.navigate('messages')} />
                    </TouchableOpacity>
                    <Avatar style={{ backgroundColor: "#eee" }} tintColor='#fff'
                        icon={<Font name='user' color={"silver"} size={28} />}
                        size={50} color='#fff'
                        image={{ uri: baseUrlFile + "/" + urlImage }} />
                    <Text style={{ color: '#222', fontSize: 15, fontWeight: "800" }}>{receiveData && receiveData.pseudo} </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Feather name='phone-call' size={24} color={'#444'} />
                    <MaterialIcons name='more-vert' size={24} color={'#444'} />
                </View>
            </View>
            <ScrollView>
                {
                    msgs && msgs.length > 0 && msgs.map((val, index) => {
                        return (
                            <Pressable key={index}
                                style={val && val.senderId && val.senderId._id === userIdConnected ?
                                    {
                                        alignSelf: "flex-end",
                                        backgroundColor: "#DCF8C6",
                                        padding: 8,
                                        maxWidth: "60%",
                                        borderRadius: 7,
                                        margin: 10
                                    } : {
                                        alignSelf: "flex-start",
                                        backgroundColor: '#fff',
                                        margin: 10,
                                        padding: 8,
                                        maxWidth: "60%",
                                        borderRadius: 7,
                                    }}
                            >
                                <Text style={{ color: "#333", textAlign: "left" }}>{val && val.messageText}</Text>
                                <Text style={{ textAlign: "right", fontSize: 11, color: "gray", marginTop: 5 }}>{formatTime(val && val.timestamps)}</Text>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>

            <View style={{
                flexDirection: 'row', alignItems: "center", paddingHorizontal: 10,
                marginBottom: showEmoji ? 0 : 10,
                height: 50,
            }}>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        paddingLeft: 10,
                        paddingTop: 5,
                        paddingRight: 10,
                        paddingBottom: 5
                    }}
                >
                    <Feather
                        style={{ color: "#333" }}
                        name="smile"
                        size={24}
                        onPress={() => handleEmoji()}
                    />
                    <TextInput
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                        underlineColor='transparent'
                        placeholderTextColor={'#222'}
                        style={{
                            flex: 1,
                            height: 40,
                            borderWidth: 0,
                            borderColor: '#ddd',
                            backgroundColor: "#fff", 
                            color:"#111"
                        }}
                        placeholder='Taper votre message...' />

                    <AntDesign
                        size={24}
                        name="camera"
                        color={"#333"}
                        onPress={pickImage}
                    />
                    <Feather
                        size={24}
                        name="mic"
                        color={"#333"}
                    />
                </View>

                <Pressable
                    onPress={() => handleSend("text")}
                    style={{
                        backgroundColor: "crimson",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Feather
                        size={20}
                        name="send"
                        color={'#fff'}
                    />
                </Pressable>
            </View>

            {
                showEmoji &&
                <EmojiSelector columns={9}
                    onEmojiSelected={(emoji) => {
                        setMessage((prevMsg) => prevMsg + emoji)
                    }} style={{ height: 250, width: "100%", }} />
            }
        </KeyboardAvoidingView>
    )
}

export default ChatMessage