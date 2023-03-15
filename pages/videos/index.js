import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Card from '../../components/Card'
import dashboardStyles from '../Home/style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux"

const Videos = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const data = useSelector(state => {
    return state
  });

  const getDataAll = () => {
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${"Kery James"}songs&type=video&key=AIzaSyD31fgEYyb7M2HmnrPS_CZMwjjwBa25ylA`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "add",
          payload: data.items
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataAll();
  }, []);

  return (
    <View
      style={{ flex: 1 }}
    >
      <View style={dashboardStyles.header}>
        <Image source={require("../../images/logo.jpeg")} style={dashboardStyles.userImg} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 24

          }}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={"#333"} size={30}
            onPress={() => navigation.navigate("search")}
          />
          <MaterialCommunityIcons
            name="text-box-search-outline"
            color={"#333"} size={30}
            onPress={() => navigation.navigate("search")}
          />
          <Image source={require("../../images/cash.jpeg")} style={dashboardStyles.userImg} />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <Card
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            publishTime={item.snippet.publishTime}
            description={item.snippet.description}
          />
        }}
        keyExtractor={item => item.id.videoId}
      />
    </View>
  )
}

export default Videos