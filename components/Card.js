import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';


const Card = (props) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("videoPlayer",
                { videoId: props.videoId, title: props.title, description: props.description })
            }
        >
            <View
                style={{
                    marginBottom: 10
                }}
            >
                <Image
                    source={{
                        uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`
                    }}

                    style={{
                        width: "100%",
                        height: 200
                    }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        margin: 5,
                    }}
                >
                    <MaterialCommunityIcons name="account-circle" color={"#333"} size={45} />

                    <View
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 800,
                                width: Dimensions.get("screen").width - 100
                            }}
                            ellipsizeMode='tail'
                            numberOfLines={2}
                        >
                            {props.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center",
                                color: '#000',
                                fontSize: 14,
                                fontWeight: 700
                            }}
                        >
                            <Text>{props.channel.substring(0, 10)}</Text>
                            <Text>3,6 K de vues</Text>
                            <Text>Il y a {moment(props.publishTime).fromNow()}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card