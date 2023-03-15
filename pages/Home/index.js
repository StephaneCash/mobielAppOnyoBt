import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react';
import dashboardStyles from './style.js';
import { FakaData } from '../../fakeData/fakeActivitty.js';
import ActivityItem from '../../components/activityItem/index.js';
import { FakeVideos } from '../../fakeData/fakeVideoComment.js';
import VideoPlus from '../../components/videosPlusComments/index.js';

const Home = () => {
  return (
    <ScrollView>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.userName}>Stéphane</Text>
        <Image source={require("../../images/cash.jpeg")} style={dashboardStyles.userImg} />
      </View>

      <FlatList
        data={FakaData}
        showsHorizontalScrollIndicator={false}
        style={dashboardStyles.scrollabelList}
        keyExtractor={item => item.id}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <ActivityItem item={item} />
          )
        }}
      />

      <View style={dashboardStyles.videosComment}>
        <Text style={dashboardStyles.videoTitle}>
          Vidéos avec plus de commentaires
        </Text>
      </View>

      <FlatList
        data={FakeVideos}
        showsHorizontalScrollIndicator={false}
        style={dashboardStyles.scrollabelList}
        keyExtractor={item => item.id}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <VideoPlus item={item} />
          )
        }}
      />

      <View style={dashboardStyles.spaceBettwen}>
        <Text style={dashboardStyles.videoTitle}>
          Transactions
        </Text>

        <TouchableOpacity>
          <Text style={dashboardStyles.link}>
            Afficher tout
          </Text>
        </TouchableOpacity>
      </View>

      <View style={dashboardStyles.transactionContainer}></View>

    </ScrollView>
  )
}

export default Home