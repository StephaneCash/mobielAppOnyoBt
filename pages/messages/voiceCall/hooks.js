import { useEffect, useState, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import RtcEngine from 'react-native-agora';
import { requestAudioPermission } from './permissions';

export const useRequestAudioHook = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            // Request required permissions from Android

            requestAudioPermission().then(() => {
                console.log('requested!');
            }).catch(err => {
                console.log(err)
            })
        }
    }, []);
};

export const useInitializeAgora = () => {
    // Replace yourAppId with the App ID of your Agora project.
    const appId = '35a8c9ce2ba04d5c9458575e4f7fc447';
    
    const [channelName, setChannelName] = useState('');
    const [joinSucceed, setJoinSucceed] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const [isMute, setIsMute] = useState(false);
    const [isSpeakerEnable, setIsSpeakerEnable] = useState(false);
    const rtcEngine = useRef(null);

    const initAgora = useCallback(async () => {
        try {
            rtcEngine.current = await RtcEngine.create(appId);
        } catch (error) {
            console.log(error)
        }

        await rtcEngine.current?.enableAudio();
        await rtcEngine.current?.muteLocalAudioStream(false);
        await rtcEngine.current?.setEnableSpeakerphone(true);

        rtcEngine.current?.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);

            setPeerIds((peerIdsLocal) => {
                if (peerIdsLocal.indexOf(uid) === -1) {
                    return [...peerIdsLocal, uid];
                }

                return peerIdsLocal;
            });
        });

        rtcEngine.current?.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);

            setPeerIds((peerIdsLocal) => {
                return peerIdsLocal.filter((id) => id === uid);
            });
        });

        rtcEngine.current?.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed);

                setJoinSucceed(true);

                setPeerIds((peerIdsLocal) => {
                    return [...peerIdsLocal, uid];
                });
            },
        );

        rtcEngine.current?.addListener('Error', (error) => {
            console.log('Error', error);
        });
    }, []);

    const joinChannel = useCallback(async () => {
        try {
            await rtcEngine.current?.joinChannel("35a8c9ce2ba04d5c9458575e4f7fc447", "cash", null, 0);
        } catch (error) {
            console.log(error);
        }
    }, [channelName]);

    console.log(channelName , " NOM CHAINE CHANGED")

    const leaveChannel = useCallback(async () => {
        try {
            await rtcEngine.current?.leaveChannel();
            setPeerIds([]);
            setJoinSucceed(false);
            setChannelName('');
        } catch (error) {
            console.log(error)
        }
    }, []);

    const toggleIsMute = useCallback(async () => {
        try {
            await rtcEngine.current?.muteLocalAudioStream(!isMute);
            setIsMute(!isMute);
        } catch (error) {
            console.log(error)
        }
    }, [isMute]);

    const toggleIsSpeakerEnable = useCallback(async () => {
        try {
           await rtcEngine.current?.setEnableSpeakerphone(!isSpeakerEnable);
           setIsSpeakerEnable(!isSpeakerEnable);
       } catch (error) {
           console.log(error)
      } }, [isSpeakerEnable]);

    const destroyAgoraEngine = useCallback(async () => {
        try {
            await rtcEngine.current?.destroy();
        } catch (error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        initAgora();
        return () => {
            destroyAgoraEngine();
        };
    }, [destroyAgoraEngine, initAgora]);

    const formatCounter = (time) => {
        let hours = Math.floor(time / 60 / 60 % 24);
        let minutes = Math.floor(time / 60 % 60);
        let secondes = Math.floor(time % 60);
    
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;
    
        return hours + ":" + minutes + ":" + secondes;
    }

    return {
        channelName,
        isMute,
        isSpeakerEnable,
        joinSucceed,
        peerIds,
        setChannelName,
        joinChannel,
        leaveChannel,
        toggleIsMute,
        toggleIsSpeakerEnable,
        formatCounter
    };
};