import React, { useContext, useEffect, useRef, useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather';
import { ContextApp } from '../../../../context/AuthContext';
import Sound from 'react-native-sound';
import callVoiceSound from "../../../../assets/sounds/call.mp3"
import { useInitializeAgora, useRequestAudioHook } from '../../voiceCall/hooks';

var callSound = new Sound(callVoiceSound, error => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

function CallerVideo({ route }) {

    const [videoCall, setVideoCall] = useState(true);
    const { socket } = useContext(ContextApp);
    const timer = useRef()
    const navigation = useNavigation();

    const channel = route && route.params && route.params.channel;
    const isArrive = route && route.params && route.params.isArrive

    const connectionData = {
        appId: '35a8c9ce2ba04d5c9458575e4f7fc447',
        channel: route && route.params && route.params.channel,
    };

    useEffect(() => {
        if (isArrive === true) {
          setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }
    }, [isArrive])

    useEffect(() => {
        callSound.play();
    }, []);

    useEffect(() => {
        const msgRoom = {
            room: "ChatOnyoBT",
            caller: route && route.params && route.params.fullDataUserConnected,
            called: route && route.params && route.params.receiveData,
            channel: route && route.params && route.params.channel
        }
        socket.emit("newAppelVideo", msgRoom);
    }, [route]);

    const onShare = async () => {
        try {
            await Share.share({ message: channel });
        } catch (error) {
            console.log(error.message);
        }
    };

    const rtcCallbacks = {
        EndCall: () => {
            setVideoCall(false);
            clearInterval(timer.current);
            const msgRoom = {
                room: "ChatOnyoBT",
                caller: route && route.params && route.params.fullDataUserConnected,
                called: route && route.params && route.params.receiveData,
                channel: route && route.params && route.params.channel
            }
            socket.emit("stopAppelVideo", msgRoom);
        },
    };

    useEffect(() => {
        socket.on('stopAppelVideoEmit', (data) => {
            setVideoCall(false);
            callSound.stop();
        });
    }, [socket]);

    socket.on('acceptCallVideoEmit', (data) => {
        callSound.stop();
    });

    const [time, setTime] = useState(0);

    useRequestAudioHook();
    const {
        formatCounter,
        setChannelName
    } = useInitializeAgora();

    return videoCall ? (
        <>
            <AgoraUIKit
                connectionData={connectionData}
                rtcCallbacks={rtcCallbacks}
            />
            <TouchableOpacity style={styles.shareButton}>
                <Feather name='user-plus' size={20} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.crono}>
                <Text style={{ color: "#fff" }}>
                    {
                        formatCounter(time)
                    }
                </Text>
            </TouchableOpacity>
        </>
    ) : (
        <TouchableOpacity style={styles.shareButton}>
            <Text style={{ color: "#fff" }} onPress={() => navigation.navigate('messages')}>Retour</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    shareButton: {
        right: 0,
        width: 80,
        height: 40,
        margin: 25, top: 10,

        borderRadius: 8,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#78b0ff",
    },
    crono: {
        right: 0,
        width: 80,
        height: 40,
        margin: 25, top: 50,

        borderRadius: 8,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    shareButtonText: {
        fontSize: 16,
    },
})

export default CallerVideo