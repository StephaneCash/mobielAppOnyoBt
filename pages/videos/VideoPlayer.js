import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WebView } from "react-native-webview"
import Constants from 'expo-constants'
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { baseUrlFile } from '../../bases/basesUrl';

const VideoPlayer = ({ route, navigation }) => {

    const { width, height } = Dimensions.get("screen");

    const [postData, setPostData] = useState();

    useEffect(() => {
        setPostData(route.params.data)
    }, []);

    const navigationRoutes = useNavigation();
    console.log('------------------------------------------------------------------------------------------------')
    console.log(route.params.data, " UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUuu")


    return (
        <View style={styles.mainPlayerView}>
            <View style={{ height: height / 3, backgroundColor: "gray", width: "100%" }}>
                <Video style={{ width: width, height: "100%" }}
                    source={{ uri: baseUrlFile + route.params.data.video }}
                    controls={true}
                />
            </View>
            <Text style={styles.postTitle}>{postData && postData.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainPlayerView: {
        flex: 1,
        alignItems: "center"
    },
    postTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 20,
        color: "#000"
    },
    videoP: {
        width: "100%",
        height: "100%"
    }
})

export default VideoPlayer