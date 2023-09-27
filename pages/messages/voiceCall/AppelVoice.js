import React, { useContext, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';
import callVoiceSound from "../../../assets/sounds/call.mp3"
import sonnerie from "../../../assets/sounds/sonnerie.mp3"
import { useInitializeAgora, useRequestAudioHook } from './hooks';
import { ContextApp } from '../../../context/AuthContext';
import Called from './called/Called';
import Caller from './caller/Caller';

var sonnerieSound = new Sound(sonnerie, error => {
    if (error) {
        return console.log(error);
    }
})

var callSound = new Sound(callVoiceSound, error => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
})

const AppelVoice = ({ navigation, route, }) => {

    const { userConnected, socket } = useContext(ContextApp);
    const [userCallId, setUserCall] = useState('');

    const called = route && route.params && route.params.called
    const caller = route && route.params && route.params.caller;
    const channelName = route && route.params && route.params.channelName;

    const [isCall, setIsCall] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    useRequestAudioHook();
    const {
        formatCounter,
        isMute,
        isSpeakerEnable,
        joinSucceed,
        peerIds,
        leaveChannel,
        joinChannel,
        toggleIsMute,
        toggleIsSpeakerEnable,
        setChannelName
    } = useInitializeAgora();

    const [time, setTime] = useState(0);

    const idUser = userConnected && userConnected.user;

    const timer = useRef()

    const stopVoiceCall = () => {
        sonnerieSound.stop()
        callSound.stop()
        setTimeout(() => {
            clearInterval(timer.current);
            const room = {
                room: "ChatOnyoBT",
                userCallId
            }
            socket.emit('stopAppel', room);
        }, 100);
    };

    useEffect(() => {
        socket.on("stopAppelEmit", (data) => {
            sonnerieSound.stop();
            callSound.stop();
            navigation.navigate("messages");
        });
    }, [socket]);

    useEffect(() => {
        if (peerIds && peerIds.length === 2) {
            sonnerieSound.stop()
            callSound.stop()
        }
    }, [peerIds]);

    useEffect(() => {
        setChannelName(channelName)
        if (joinSucceed) {
            if (peerIds && peerIds.length === 2) {
                timer.current = setInterval(() => {
                    setTime(prev => prev + 1)
                }, 1000)
            }
        }
        return () => clearInterval(timer.current);
    }, [joinSucceed, peerIds,]);

    useEffect(() => {
        if (caller && caller._id === idUser) {
                callSound.play()
                setIsCall(true);
                console.log("is TRue 1")
        } else if (called && called._id === idUser) {
                setIsCalling(true);
                console.log("is TRue 2")
                sonnerieSound.play((sucess) => {
                    if (sucess) {
                        sonnerieSound.play((sucess) => {
                            if (sucess) {
                                sonnerieSound.play()
                            }
                        });
                    }
                })
        }
    }, [idUser, called, caller]);

    return (
        <>
            {
                isCall === true &&
                <Caller
                    stopVoiceCall={stopVoiceCall}
                    isMute={isMute}
                    joinSucceed={joinSucceed}
                    called={called}
                    navigation={navigation}
                    toggleIsSpeakerEnable={toggleIsSpeakerEnable}
                    toggleIsMute={toggleIsMute}
                    leaveChannel={leaveChannel}
                    formatCounter={formatCounter}
                    isSpeakerEnable={isSpeakerEnable}
                    time={time}
                    peerIds={peerIds}
                    caller={caller}
                />
            }

            {
                isCalling === true &&
                <Called
                    caller={caller}
                    time={time}
                    leaveChannel={leaveChannel}
                    joinSucceed={joinSucceed}
                    joinChannel={joinChannel}
                    navigation={navigation}
                    toggleIsSpeakerEnable={toggleIsSpeakerEnable}
                    stopVoiceCall={stopVoiceCall}
                    peerIds={peerIds}
                    formatCounter={formatCounter}
                    isSpeakerEnable={isSpeakerEnable}
                    toggleIsMute={toggleIsMute}
                    isMute={isMute}
                    called={called}
                />
            }
        </>
    )
}

export default AppelVoice;