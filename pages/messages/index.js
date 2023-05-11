import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Messages = () => {

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text>Messages</Text>
            <MaterialIcons name='wifi' size={59} />
        </View>
    )
}

export default Messages