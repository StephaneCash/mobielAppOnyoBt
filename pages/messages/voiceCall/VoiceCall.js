import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { SafeAreaView, TextInput } from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from './hooks';
import Button from './Button';
import styles from './styles';
import Sound from 'react-native-sound';
import callVoiceSound from "../../../assets/sounds/call.mp3"

const VoiceCall = () => {

    useRequestAudioHook();
    const {
        channelName,
        isMute,
        joinSucceed,
        isSpeakerEnable,
        peerIds,
        setChannelName,
        joinChannel,
        leaveChannel,
        toggleIsMute,
        toggleIsSpeakerEnable
    } = useInitializeAgora();

    Sound.setCategory('Playback');

    var sound = new Sound(callVoiceSound, error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());

        // Play the sound with an onEnd callback

        /*sound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });*/
    });

    useEffect(() => {
        sound.setVolume(1);
        return () => {
            sound.release();
        };
    }, []);

    useEffect(() => {
        if (peerIds && peerIds.length > 1) {
            sound.pause();
        }
    }, [peerIds]);

    console.log(peerIds && peerIds.length, " LENGTH")

    // Reduce the volume by half
    sound.setVolume(0.5);

    // Position the sound to the full right in a stereo field
    sound.setPan(1);

    // Loop indefinitely until stop() is called
    sound.setNumberOfLoops(-1);

    // Get properties of the player instance
    console.log('volume: ' + sound.getVolume());
    console.log('pan: ' + sound.getPan());
    console.log('loops: ' + sound.getNumberOfLoops());

    // Seek to a specific point in seconds
    sound.setCurrentTime(2.5);

    // Get the current playback point in seconds
    sound.getCurrentTime((seconds) => console.log('at ' + seconds));

    // Pause the sound
    sound.pause();

    // Stop the sound and rewind to the beginning
    sound.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        sound.play();
    });

    // Release the audio player resource
    sound.release();


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.channelInputContainer}>
                    <Text>Enter Channel Name:</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setChannelName(text)}
                        placeholder={'Channel Name'}
                        value={channelName}
                    />
                </View>

                <View style={styles.joinLeaveButtonContainer}>
                    <Button
                        onPress={joinSucceed ? leaveChannel : joinChannel}
                        title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
                    />
                </View>

                <View style={styles.floatRight}>
                    <Button onPress={toggleIsMute} title={isMute ? 'UnMute' : 'Mute'} />
                </View>

                <View style={styles.floatLeft}>
                    <Button
                        onPress={toggleIsSpeakerEnable}
                        title={isSpeakerEnable ? 'Disable Speaker' : 'Enable Speaker'}
                    />
                </View>


                <View style={styles.usersListContainer}>
                    {peerIds.map((peerId) => {
                        return (
                            <View key={peerId}>
                                <Text>{`Joined User ${peerId}`}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default VoiceCall