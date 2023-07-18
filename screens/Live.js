import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole } from "react-native-agora";

async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the cameras & mic");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function Live({ route }) {

  const isBroadCasting = route && route.params.type === "create"

  const AgoraEngine = useRef();

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create("35a8c9ce2ba04d5c9458575e4f7fc447");
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadCasting);
    if (isBroadCasting) AgoraEngine.current.setChannelProfile(ClientRole.Broadcaster);

    AgoraEngine.current.addListenner('JoinChannelSuccess', (channel, uid, elapsed)=>{
      console.log("Join success", channel, uid, elapsed)
    })
  }

  useEffect(async () => {
    const uid = isBroadCasting ? 1 : 0;
    if (Platform.OS === 'android') await requestCameraAndAudioPermission();
    init().then(()=>{
      AgoraEngine.current.joinChannel(null, route && route.params.channel, null, uid);
    })
    return () => {
      AgoraEngine.current.destroy();
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>Live</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});