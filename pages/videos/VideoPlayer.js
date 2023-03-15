import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { WebView } from "react-native-webview"
import Constants from 'expo-constants'
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VideoPlayer = ({ route, navigation }) => {

    const { title, videoId, description } = route.params;

    const navigationRoutes = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                marginTop: Constants.statusBarHeight
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 430
                }}
            >
                <WebView
                    javaScriptEnabled={true}
                    source={{
                        uri: `https://www.youtube.com/embed/${videoId}`
                    }}
                />

                <View>
                    <View

                    >
                        <Text
                            style={{
                                fontSize: 20,
                                width: Dimensions.get("screen").width - 50,
                                margin: 9,
                                fontWeight: "bold"
                            }}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                width: Dimensions.get("screen").width - 50,
                                margin: 9
                            }}
                            numberOfLines={5}
                            ellipsizeMode='tail'
                        >
                            {description}
                        </Text>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginLeft: 10,
                            marginTop: 10
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <Text>5 J'aime</Text>
                            <MaterialCommunityIcons name="cards-heart-outline" color={"#333"} size={32} />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <MaterialCommunityIcons name="comment-multiple-outline" color={"#333"} size={32} />
                            <Text> 17 Commentaires </Text>
                        </View>

                        <View>
                            <MaterialCommunityIcons name="share" color={"#333"} size={32} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VideoPlayer