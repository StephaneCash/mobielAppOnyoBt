import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Sound from 'react-native-sound';
import callVoiceSound from "../../../assets/sounds/call.mp3"

const VoiceCall = () => {

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

    sound.getCurrentTime((seconds) => console.log('at ' + seconds));

    // Pause the sound
    sound.pause();

    sound.stop(() => {
        sound.play();
    });

    // Release the audio player resource
    sound.release();

    return
}

export default VoiceCall