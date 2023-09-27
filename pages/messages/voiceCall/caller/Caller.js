import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from "./caller.style"
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import Font from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { baseUrl, baseUrlFile } from '../../../../bases/basesUrl';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import "react-native-get-random-values"
import { v4 as uuid } from "uuid"


const Caller = ({ called, peerIds, toggleIsSpeakerEnable, formatCounter,
    toggleIsMute, time, joinSucceed, isMute, stopVoiceCall, navigation, leaveChannel,
    isSpeakerEnable, caller }) => {

    const { height } = Dimensions.get("screen");
    const imageCalled = called && called.url;

    const [typeCall, setTypeCall] = useState(false);

    const createHistorique = async (status) => {
        try {
            await axios.post(`${baseUrl}/historiques`, {
                callerId: caller && caller._id,
                calledId: called && called._id,
                duree: formatCounter(time),
                status: status,
                type: 1
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const nav = useNavigation()
    const createLive = () => navigation.navigate('videoCall', { type: 'create', channel: uuid() })

    return <View style={styles.container(height)}>
        <View style={styles.bloc1}>
            <View style={styles.head}>
                <TouchableOpacity>
                    <Feather name='arrow-left' size={24} color={'#333'} onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                <View style={styles.containerTitle}>
                    <Feather name='lock' size={15} color={'#333'} />
                    <Text style={styles.titleHead}>Chiffré de bout en bout</Text>
                </View>

                <TouchableOpacity>
                    <Feather name='user-plus' size={24} color={'#333'} />
                </TouchableOpacity>
            </View>

            <View style={styles.nomUserAndDurationText}>
                <Text style={styles.textNom}>{called && called.pseudo
                    && called.pseudo.length > 20 ?
                    called && called.pseudo && called.pseudo.substring(0, 20) + "..." :
                    called && called.pseudo
                }</Text>
            </View>

            <View style={styles.usersListContainer}>
                {peerIds && peerIds.length === 1 ? joinSucceed &&
                    <View style={{
                        flexDirection: "column",

                    }}>
                        <Text style={{ color: '#333', textAlign: "center", fontWeight: '800' }}>Appel en cours...</Text>
                        <Text style={{ color: '#333', textAlign: "center", fontWeight: '800' }}>
                            {
                                typeCall === true ? " Appel vidéo" : "Appel vocal"
                            }
                        </Text>
                    </View> :
                    peerIds && peerIds.length === 2 ?
                        <View >
                            <Text style={{ color: '#333', textAlign: "center", fontSize: 17 }}>
                                {
                                    formatCounter(time)
                                }
                            </Text>
                        </View> : !joinSucceed && <View >
                            <Text style={{ color: '#333', textAlign: "center", fontWeight: '500' }}>Appel...</Text>
                        </View>
                }
            </View>
        </View>

        <View style={styles.avatarContainer}>
            <Avatar
                style={{ backgroundColor: "#eee" }} tintColor='#fff'
                icon={<Font name='user' color={"silver"} size={28} />}
                size={200} color='#fff'
                image={{ uri: baseUrlFile + "/" + imageCalled }}
            />
        </View>

        <View style={styles.bottomCall}>
            <TouchableOpacity style={styles.speaker(isSpeakerEnable)} onPress={() => {
                toggleIsSpeakerEnable();
            }}>
                <FontAwesome5 name='volume-up' size={24} color={isSpeakerEnable ? "#fff" : '#333'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => createLive()}>
                <MaterialCommunityIcons name='video' size={30} color={'#333'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.speaker(isMute)} onPress={() => {
                toggleIsMute()
            }}>
                <FontAwesome name="microphone-slash" size={24} color={isMute ? "#fff" : '#333'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStopCall} onPress={() => {
                joinSucceed && leaveChannel();
                stopVoiceCall()
                createHistorique(1)
            }}>
                <MaterialCommunityIcons name='phone-hangup' size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    </View>
}

export default Caller