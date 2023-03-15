import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const MiniCard = (props) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("videoPlayer", { videoId: props.videoId, title: props.title, description: props.description })}
    >
      <View
        style={{
          flexDirection: "row",
          margin: 10,

        }}
      >
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`
          }}
          style={{
            width: "45%",
            height: 100
          }}
        />

        <View
          style={{
            paddingLeft: 7
          }}
        >
          <Text
            style={{
              fontSize: 15,
              width: Dimensions.get("screen").width / 2
            }}
            ellipsizeMode="tail"
            numberOfLines={7}
          >
            {props.title}
          </Text>
          <Text
            style={{
              width: Dimensions.get("screen").width / 2,
              fontSize: 13,
              marginTop: 5,
              fontWeight: 700,
            }}
          >
            {props.channel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MiniCard