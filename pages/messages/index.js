import { View, Text, StyleSheet, TextInput, SafeAreaView, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketService from '../../utils/socketService';

const Messages = () => {

    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        socketService.initializeSocket()
    }, []);

    useEffect(() => {
        let arr = []
        socketService.on("received_message", (msg) => {
            let arrClone = [...data]
            setData(arrClone.concat(msg))
        })
    }, [data]);

    const sendMessage = () => {
        if (message)
            socketService.emit("send_message", message)
        else
            Alert.alert('Entrer un msg à envoyer')
    }

    console.log(data, " DATA")

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TextInput
                        value={message}
                        placeholder='Entrer votre message'
                        placeholderTextColor={"#444"}
                        style={styles.inputStyle}
                        onChangeText={text => setMessage(text)}
                    />
                    <Button onPress={sendMessage} title='Envoyer' />
                </View>
                {
                    data && data.map((val, index) => {
                        return <Text style={{ marginTop: 10 }} key={index}>{val}</Text>
                    })
                }
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    }, inputStyle
        : {
        height: 42,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "silver",
        padding: 10,
        width: "70%"
    }
})

export default Messages