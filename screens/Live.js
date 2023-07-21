import React, { useEffect, useRef, useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

function Live({ route }) {

  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId: '35a8c9ce2ba04d5c9458575e4f7fc447',
    channel: route.params.channel,
  };

  console.log(route)

  const onShare = async () => {
    try {
      await Share.share({ message: route.params.channel });
    } catch (error) {
      console.log(error.message);
    }
  };

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Partager</Text>
      </TouchableOpacity>
    </>
  ) : (
    <Text onPress={() => setVideoCall(true)}>Démarrer</Text>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    right: 0,
    width: 80,
    height: 40,
    margin: 25,
    borderRadius: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#78b0ff",
  },
  shareButtonText: {
    fontSize: 16,
  },
})

export default Live