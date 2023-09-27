import { TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useInitializeAgora, useRequestAudioHook } from '../messages/voiceCall/hooks';
import { v4 as uuid } from "uuid"

const Call = ({ FontAwesome, navigation, socket, fullDataUserConnected, receiveData }) => {

    const [clic, setClic] = useState(false);

    const callUserFunction = () => {
        const msgRoom = {
            room: "ChatOnyoBT",
            caller: fullDataUserConnected,
            called: receiveData
        }

        socket.emit("newAppel", msgRoom);
    };

    useRequestAudioHook();
    const {
        joinChannel,
        setChannelName
    } = useInitializeAgora();

    const demarreAppel = useCallback(async () => {
        try {
            await joinChannel()
        } catch (error) {
            console.log(error)
        }
    });

    useEffect(() => {
        demarreAppel()
        const idNameApp = Math.random + uuid();
        setChannelName(idNameApp)
    }, [clic])

    return <TouchableOpacity
        onPress={async () => {
            navigation.navigate('voiceCall', { appelEntrant: true })
            demarreAppel();
            callUserFunction();
            setClic(!clic)
        }}
    >
        <FontAwesome name='phone' size={25} color={"green"} />
    </TouchableOpacity>
}

export default Call