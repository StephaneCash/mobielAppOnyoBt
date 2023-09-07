import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import AntDesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import EmojiSelector from "react-native-emoji-selector"
import { ContextApp } from '../../context/AuthContext';
import axios from 'axios';
import { baseUrl, baseUrlFile, baseUrlSocket } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from "@react-native-material/core";
import Font from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker, { types } from 'react-native-document-picker';
import { io } from "socket.io-client";

const socket = io(baseUrlSocket);

const ChatMessage = ({ route }) => {

    const { fullDataUserConnected } = useContext(ContextApp);
    const userIdConnected = fullDataUserConnected && fullDataUserConnected._id

    const scrollWiewRef = useRef(null);

    useEffect(() => {
        scrollToBottom()
    }, []);

    const scrollToBottom = () => {
        if (scrollWiewRef.current) {
            scrollWiewRef.current.scrollToEnd({ animated: false })
        }
    };

    const navigation = useNavigation();

    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [receiveData, setReceivedata] = useState();
    const [msgs, setMsgs] = useState([]);
    const [messagesSelect, setMessagesSelect] = useState([]);
    const [write, setWrite] = useState(false);
    const [userWriter, setUserWrite] = useState('')

    const recepientId = route && route.params && route.params.recepientId;

    const idUser = fullDataUserConnected && fullDataUserConnected._id

    useEffect(() => {
        // Room connection
        socket.emit("joinRoom", "ChatOnyoBT");

        socket.on("newMessage", (data) => {
            setMsgs((current) => {
                return [...current, data];
            })
        });

        setWrite(false);
    }, []);

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

    const handleSend = async () => {
        try {
            if (message) {
                const formData = {}
                formData.senderId = fullDataUserConnected && fullDataUserConnected._id;
                formData.recepientId = recepientId;
                formData.messageText = message;
                await axios.post(`${baseUrl}/messages`, formData);

                const msgRoom = {
                    room: "ChatOnyoBT",
                    senderId: fullDataUserConnected && fullDataUserConnected,
                    recepientId: recepientId,
                    messageText: message,
                    timestamps: new Date()
                }

                socket.emit("sendMsg", msgRoom);
                setWrite(false);

                const roomEmpty = {
                    recepientId: false
                }

                socket.emit("userWrite", roomEmpty);
                setMessage('');
            }
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

    const pickImage = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Disposition': 'form-data',
                }
            }

            const pickerResult = await DocumentPicker.pickSingle({
                type: [types.images],
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            })
            const formData = new FormData();

            formData.append('imageMsg', {
                uri: pickerResult && pickerResult.fileCopyUri && pickerResult.fileCopyUri,
                type: pickerResult && pickerResult.type && pickerResult.type,
                name: pickerResult && pickerResult.name && pickerResult.name,
                size: pickerResult && pickerResult.size && pickerResult.size,
            })

            formData.append("senderId", userIdConnected);
            formData.append('recepientId', recepientId);
            const data = await axios.post(`${baseUrl}/messages`, formData, config);

            fetchMessagesSenderAndRecepient()
        } catch (error) {
            console.log(error)
        }
    };

    const handleSelectMessage = (item) => {
        const isSelected = messagesSelect && messagesSelect.includes(item && item._id);

        if (isSelected) {
            setMessagesSelect((prevMsgs) => prevMsgs.filter((id) => item && id !== item._id))
        } else {
            setMessagesSelect((prevMsgs) => [...prevMsgs, item._id])
        }
    };

    const deleteMsgHandle = async (msgId) => {
        try {
            await axios.post(`${baseUrl}/messages/deleteMessages`, { messages: msgId });
            setMessagesSelect((prevMsgs) => prevMsgs.filter((id) => !msgId.includes(id)));
            fetchMessagesSenderAndRecepient();
        } catch (error) {
            console.log(error)
        }
    };

    const handleContentSizeChange = () => {
        scrollToBottom();
    };

    useEffect(() => {
        const msgRoom = {
            room: "ChatOnyoBT",
            senderId: fullDataUserConnected && fullDataUserConnected,
            recepientId: recepientId,
        }

        if (message && message.length > 0) {
            msgRoom.isWriting = true;
            socket.emit("userWrite", msgRoom);
        } else {
            msgRoom.isWriting = false;
            socket.emit("userWrite", msgRoom);
            setWrite(false);
        }
    }, [message]);

    useEffect(() => {
        const roomEmpty = {
            recepientId: false
        }
        socket.on("userWriteSignal", (data) => {
            const isActive = data && data.isWriting
            if (isActive) {
                if (data && data.recepientId === idUser) {
                    if (data && data.senderId && data.senderId._id === recepientId) {
                        setWrite(true);
                        setUserWrite(data && data.senderId && data.senderId._id)
                    }
                }
            } else if (isActive === false) {
                if (data && data.recepientId === idUser) {
                    if (data && data.senderId && data.senderId._id === recepientId) {
                        setWrite(false);
                        socket.emit("userWrite", roomEmpty);
                    }
                }
            }
        });
    }, [socket]);

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
                        <Icon name='arrowleft' size={24} color={'#333'} onPress={() => navigation.navigate('messages', {
                            retour: true
                        })} />
                    </TouchableOpacity>
                    {
                        messagesSelect && messagesSelect.length > 0 ? (
                            <View style={{ padding: 14.5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 500, color: "#222" }}>{messagesSelect && messagesSelect.length}</Text>
                            </View>
                        ) : (
                            <>
                                <Avatar
                                    style={{ backgroundColor: "#eee" }} tintColor='#fff'
                                    icon={<Font name='user' color={"silver"} size={28} />}
                                    size={50} color='#fff'
                                    image={{ uri: baseUrlFile + "/" + urlImage }}
                                />
                                <View>
                                    <Text
                                        style={{ color: '#222', fontSize: 15, fontWeight: "800" }}
                                    >
                                        {receiveData && receiveData.pseudo}
                                    </Text>
                                    <Text
                                        style={{ color: '#666', fontSize: 12, fontWeight: "800" }}
                                    >
                                        {write && userWriter === recepientId && "Ecrit..."}
                                    </Text>
                                </View>
                            </>
                        )
                    }

                </View>
                {
                    messagesSelect && messagesSelect.length === 0
                        ? <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <TouchableOpacity onPress={()=>navigation.navigate("voiceCall")}>
                            <Feather name='phone-call' size={24} color={'#444'} />
                            </TouchableOpacity>
                            <MaterialIcons name='more-vert' size={24} color={'#444'} />
                        </View>
                        :
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                            <AntDesign name='mail-reply' size={24} color={'#444'} />
                            <Feather name='star' size={24} color={'#444'} />
                            <Feather name='trash' onPress={() => deleteMsgHandle(messagesSelect)} size={24} color={'#444'} />
                            <Font name='share' size={24} color={'#444'} />
                            <AntDesign name='mail-forward' size={24} color={'#444'} />
                        </View>
                }

            </View>
            <ScrollView ref={scrollWiewRef} contentContainerStyle={{ flexGrow: 1 }} onContentSizeChange={handleContentSizeChange}>
                {
                    msgs && msgs.length > 0 && msgs.map((val, index) => {
                        const isSlectedMsg = messagesSelect && messagesSelect.includes(val && val._id);
                        if (val && val.imageUrl) {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleSelectMessage(val)}
                                    style={val && val.senderId && val.senderId._id === userIdConnected ?
                                        {
                                            alignSelf: "flex-end",
                                            backgroundColor: isSlectedMsg ? "#F0FFFF" : "#DCF8C6",
                                            padding: 8,
                                            maxWidth: isSlectedMsg ? "100%" : "60%",
                                            borderRadius: 7,
                                            margin: 10,

                                        } : {
                                            alignSelf: "flex-start",
                                            backgroundColor: isSlectedMsg ? "#F0FFFF" : "#fff",
                                            margin: 10,
                                            padding: 8,
                                            maxWidth: isSlectedMsg ? "100%" : "60%",
                                            borderRadius: 7,
                                        }}
                                >
                                    <View>
                                        <Image
                                            source={{ uri: `${baseUrlFile}/${val.imageUrl}` }}
                                            style={{ width: 200, height: 200, borderRadius: 7 }}
                                        />
                                        <Text
                                            style={{
                                                textAlign: "right", fontSize: 11, color: "white", marginTop: 5,
                                                position: "absolute", bottom: 7, right: 10
                                            }}
                                        >
                                            {formatTime(val && val.timestamps)}
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                        } else {
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleSelectMessage(val)}
                                    style={val && val.senderId && val.senderId._id === userIdConnected ?
                                        {
                                            alignSelf: "flex-end",
                                            backgroundColor: isSlectedMsg ? "#F0FFFF" : "#DCF8C6",
                                            padding: 8,
                                            maxWidth: isSlectedMsg ? "100%" : "60%",
                                            borderRadius: 7,
                                            margin: 10,
                                        } : {
                                            alignSelf: "flex-start",
                                            backgroundColor: isSlectedMsg ? "#F0FFFF" : "#fff",
                                            margin: 10,
                                            padding: 8,
                                            maxWidth: isSlectedMsg ? "100%" : "60%",
                                            borderRadius: 7,
                                        }}
                                >
                                    <Text style={{ color: "#333", textAlign: "left" }}>{val && val.messageText}</Text>
                                    <Text style={{ textAlign: "right", fontSize: 11, color: "gray", marginTop: 5 }}>{formatTime(val && val.timestamps)}</Text>
                                </Pressable>
                            )
                        }
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
                        onChangeText={(value) => {
                            setMessage(value);
                        }}
                        underlineColor='transparent'
                        placeholderTextColor={'#222'}
                        style={{
                            flex: 1,
                            height: 40,
                            borderWidth: 0,
                            borderColor: '#ddd',
                            backgroundColor: "#fff",
                            color: "#111"
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