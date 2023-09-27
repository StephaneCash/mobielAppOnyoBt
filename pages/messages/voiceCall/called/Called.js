import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./called.style"
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import { baseUrl, baseUrlFile } from '../../../../bases/basesUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ContextApp } from '../../../../context/AuthContext';
import axios from 'axios';

const Called = ({ caller, joinChannel, time, formatCounter,
  peerIds, leaveChannel, stopVoiceCall, joinSucceed, toggleIsSpeakerEnable,
  isSpeakerEnable, isMute, toggleIsMute, called }) => {

  const { socket } = useContext(ContextApp);

  const { height } = Dimensions.get("screen");
  const imageCaller = caller && caller.url;

  const [accept, setAccept] = useState(false);

  useEffect(() => {
    socket.emit("acceptCallVoice", {
      accept: true
    });
  }, [accept]);

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

  return (
    <View style={styles.container(height)}>

      {
        peerIds && peerIds.length === 2 ? "" :
          <View>
            <View style={styles.head}>
              <View style={styles.iconCallHead}>
                <Feather name='phone' color={"#fff"} />
              </View>
              <Text style={styles.textAppel}>APPEL VOCAL ONYO-BT</Text>
            </View>

            <View style={styles.containerName}>
              <Text style={{ fontSize: 18, color: "#222" }}>
                {caller && caller.pseudo}
              </Text>
              <Text style={styles.textAppelEntrant}>Appel vocal entrant</Text>
            </View>
          </View>
      }

      <View style={styles.usersListContainer}>
        {peerIds && peerIds.length === 1 ? joinSucceed &&
          <View >
            <Text style={{ color: '#333', textAlign: "center", fontWeight: '800' }}>Appel en cours...</Text>
          </View> :
          peerIds && peerIds.length === 2 ?
            <View>
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
              <Text style={{ fontSize: 18, color: "#222", textAlign: "center", fontWeight: "800", marginBottom: 10 }}>
                {caller && caller.pseudo}
              </Text>
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

      <View style={styles.avatarContainer}>
        <Avatar
          style={{ backgroundColor: "gray" }} tintColor='#fff'
          icon={<Feather name='user' color={"#fff"} size={78} />}
          size={200} color='#fff'
          image={{ uri: baseUrlFile + "/" + imageCaller }}
        />
      </View>
      {
        peerIds && peerIds.length === 2 ?
          <View style={styles.bottomCall}>
            <TouchableOpacity style={styles.speaker(isSpeakerEnable)} onPress={toggleIsSpeakerEnable}>
              <FontAwesome5 name='volume-up' size={24} color={isSpeakerEnable ? "#fff" : '#333'} />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons name='video' size={30} color={'#333'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.speaker(isMute)} onPress={() => {
              toggleIsMute()
            }}>
              <FontAwesome name="microphone-slash" size={24} color={isMute ? "#fff" : '#333'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStopCall2} onPress={() => {
              joinSucceed && leaveChannel();
              stopVoiceCall()
              createHistorique(1)
            }}>
              <MaterialCommunityIcons name='phone-hangup' size={24} color={'#fff'} />
            </TouchableOpacity>
          </View> :
          <View style={styles.bottomCall}>
            <TouchableOpacity style={styles.btnStopCall} onPress={() => {
              joinSucceed && leaveChannel();
              stopVoiceCall()
              createHistorique(0)
            }}>
              <MaterialCommunityIcons name='phone-hangup' size={30} color={'#fff'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnAcceptpCall}
              onPress={() => {
                joinChannel()
              }}
            >
              <Feather name='phone' size={30} color={"#fff"} />
            </TouchableOpacity>
          </View>
      }

    </View>
  )
}

export default Called