import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from "./called.style"
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../../../bases/basesUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Called = ({ caller, joinChannel, time, formatCounter, peerIds, leaveChannel, stopVoiceCall, joinSucceed }) => {

  const { height } = Dimensions.get("screen");
  const imageCaller = caller && caller.url;

  return (
    <View style={styles.container(height)}>
      <View>
        {
          peerIds && peerIds.length === 2 ? "" :
            <View style={styles.head}>
              <View style={styles.iconCallHead}>
                <Feather name='phone' color={"#fff"} />
              </View>
              <Text style={styles.textAppel}>APPEL VOCAL ONYO-BT</Text>
            </View>
        }

        {
          peerIds && peerIds.length === 2 ?
            "" :
            <View style={styles.containerName}>
              <Text style={{ fontSize: 18, color: "#222" }}>
                {caller && caller.pseudo}
              </Text>
              <Text style={styles.textAppelEntrant}>Appel vocal entrant</Text>
            </View>
        }

      </View>

      <View style={styles.usersListContainer}>
        <Text style={{ color: "#222", fontSize: 18, textAlign: "center", marginTop: 10 }}>
          Fin d'appel
        </Text>
        {peerIds && peerIds.length === 1 ? joinSucceed &&
          <View >
            <Text style={{ color: '#333', textAlign: "center", fontWeight: '800' }}>Appel en cours...</Text>
          </View> :
          peerIds && peerIds.length === 2 ?
            <View >
              <Text style={{ color: '#333', textAlign: "center" }}>
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

      <View style={styles.bottomCall}>
        <TouchableOpacity style={styles.btnStopCall} onPress={() => {
          joinSucceed && leaveChannel();
          stopVoiceCall()
        }}>
          <MaterialCommunityIcons name='phone-hangup' size={30} color={'#fff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAcceptpCall} onPress={() => joinChannel()}>
          <Feather name='phone' size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Called