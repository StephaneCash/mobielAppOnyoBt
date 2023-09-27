import React, { useContext, useEffect, useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from "@react-navigation/native";
import { ContextApp } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { modifUser } from '../reducers/UserOne.reducer';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

function Live({ route }) {

  const { fullDataUserConnected } = useContext(ContextApp);
  const [videoCall, setVideoCall] = useState(true);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const connectionData = {
    appId: '35a8c9ce2ba04d5c9458575e4f7fc447',
    channel: route.params.channel,
  };

  const onShare = async () => {
    try {
      await Share.share({ message: route.params.channel });
    } catch (error) {
      console.log(error.message);
    }
  };

  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false)
      navigation.navigate('liveHome');
      if (route.params && route.params.type === "create") {
        let user = {};
        user.userId = fullDataUserConnected && fullDataUserConnected._id;
        user.statusLive = false;
        user.idLiveChannel = "";
        dispatch(modifUser(user));
      }
    },
  };

  useEffect(() => {
    if (route.params && route.params.type === "create") {
      let user = {};
      user.userId = fullDataUserConnected && fullDataUserConnected._id;
      user.statusLive = true;
      user.idLiveChannel = route.params.channel;
      dispatch(modifUser(user));
    }
  }, [videoCall]);

  return videoCall ? (
    <>
      <AgoraUIKit
        connectionData={connectionData}
        rtcCallbacks={rtcCallbacks}
      />
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <EvilIcons size={40} color="#fff" name='share-google' />
      </TouchableOpacity>
    </>
  ) : (
    <Text onPress={() => setVideoCall(false)}>Démarrer</Text>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    right: 0,
    width: 50,
    height: 50,
    margin: 25, top: 10,
    flexDirection:"column",
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Live