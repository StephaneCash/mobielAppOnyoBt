import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EmojiSelector from "react-native-emoji-selector"
import { ContextApp } from '../../context/AuthContext';
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';

const ChatMessage = ({ route }) => {

    const navigation = useNavigation();

    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [receiveData, setReceivedata] = useState();
    const [msgs, setMsgs] = useState([]);

    const recepientId = route && route.params && route.params.recepientId

    const { fullDataUserConnected } = useContext(ContextApp);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.
                get(`${baseUrl}/messages/${fullDataUserConnected && fullDataUserConnected._id}/${recepientId}`);
            setMsgs(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {

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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "j",
            headerLeft: () => (
                <View>
                    <Feather name='arrow-back' size={20} color={"red"} />
                </View>
            )
        })
    }, [recepientId]);

    const handleEmoji = () => {
        setShowEmoji(!showEmoji);
    };

    const handleSend = async () => {
        try {
            const formData = {}
            formData.senderId = fullDataUserConnected && fullDataUserConnected._id;
            formData.recepientId = recepientId;
            formData.messageText = message;

            const { data } = await axios.post(`${baseUrl}/messages`, formData);

            setMessage('');
            console.log(newMsg);
        } catch (error) {
            console.log(error)
        }
    }

    console.log(msgs, " MESSAGES")

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#D0D0D0" }}>
            <ScrollView>

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
                        style={{
                            flex: 1,
                            height: 40,
                            borderWidth: 0,
                            borderColor: '#ddd',
                            backgroundColor: "#fff"
                        }}
                        placeholder='Taper votre message...' />

                    <AntDesign
                        size={24}
                        name="camera"
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