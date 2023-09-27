import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./calledVideo.style"
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import { baseUrl, baseUrlFile } from '../../../../bases/basesUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContextApp } from '../../../../context/AuthContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
import sonnerie from "../../../../assets/sounds/sonnerie.mp3"

var sonnerieSound = new Sound(sonnerie, error => {
    if (error) {
        return console.log(error);
    };
})

const CalledVideo = ({ time, formatCounter,
    called, route }) => {

    const { socket } = useContext(ContextApp);
    const { height } = Dimensions.get("screen");

    const caller = route && route.params && route.params.caller;

    const imageCaller = caller && caller.url;

    const navigation = useNavigation();

    const createHistorique = async (status) => {
        try {
            await axios.post(`${baseUrl}/historiques`, {
                callerId: caller && caller._id,
                calledId: called && called._id,
                duree: formatCounter(time),
                status: status,
                type: 0
            })
        } catch (error) {
            console.log(error)
        }
    }

    const channel = route && route.params && route.params.channel;

    const acceptCallVideo = () => {
        sonnerieSound.stop()
        const msgRoom = {
            room: "ChatOnyoBT",
        }
        socket.emit("acceptCallVideo", msgRoom);
        navigation.navigate('videoCall', { type: 'create', channel: channel && channel, isArrive: true });
    };

    useEffect(() => {
        sonnerieSound.play((sucess) => {
            if (sucess) {
                sonnerieSound.play((sucess) => {
                    if (sucess) {
                        sonnerieSound.play()
                    }
                });
            }
        });
    }, [route]);

    useEffect(() => {
        socket.on('stopAppelVideoEmit', (data) => {
            sonnerieSound.stop()
            navigation.navigate('messages')
        });
    }, [socket]);

    return (
        <View style={styles.container(height)}>
            <View>
                <View style={styles.head}>
                    <View style={styles.iconCallHead}>
                        <Feather name='video' color={"#fff"} />
                    </View>
                    <Text style={styles.textAppel}>APPEL VIDEO ONYO-BT</Text>
                </View>

                <View style={styles.containerName}>
                    <Text style={{ fontSize: 18, color: "#222" }}>
                        {caller && caller.pseudo}
                    </Text>
                    <Text style={styles.textAppelEntrant}>Appel vidéo entrant</Text>
                </View>
            </View>

            <View style={styles.avatarContainer}>
                <Avatar
                    style={{ backgroundColor: "gray" }} tintColor='#fff'
                    icon={<Feather name='user' color={"#fff"} size={78} />}
                    size={200} color='#fff'
                    image={{ uri: baseUrlFile + "/" + imageCaller }}
                />
            </View>

            <View style={styles.bottomCall}>
                <TouchableOpacity style={styles.btnStopCall} onPress={() => {
                    const msgRoom = {
                        room: "ChatOnyoBT",
                    }
                    socket.emit("stopAppelVideo", msgRoom);
                    createHistorique(0)
                }}>
                    <MaterialCommunityIcons name='phone-hangup' size={30} color={'#fff'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnAcceptpCall}
                    onPress={() => {
                        acceptCallVideo()
                    }}
                >
                    <Feather name='phone' size={30} color={"#fff"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CalledVideo;