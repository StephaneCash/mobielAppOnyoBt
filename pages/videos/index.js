import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux"
import { ContextApp } from '../../context/AuthContext';
import { dateParserFunction } from '../../outils/constantes';
import Feather from 'react-native-vector-icons/Feather';
import { getAllPosts } from '../../reducers/Posts.reducer';


const Videos = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const dispatch = useDispatch();

  const { fullDataUserConnected } = useContext(ContextApp);

  const data = useSelector(state => state.posts.value);
  const users = useSelector(state => state.users.value);

  const isLoading = useSelector(state => state.posts.loading);
  const views = [];

  const handleCountNumberViews = (val) => {
    views.push(val);
    // console.log('__________________________________________________________________________')
    // console.log(views.length , " ::::::::::::DATA DATA")
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <View style={styles.mainView}>
        <TextInput style={styles.textInput}
          value={valueSearch} onChangeText={(value) => setValueSearch(value)}
          placeholder='Rechercher...'
          placeholderTextColor={'#000'}
        />

        <TouchableOpacity onPress={() => {
          navigation.navigate('videos/add')
        }}>
          <Feather name="plus-circle" size={40} />
        </TouchableOpacity>
      </View>
      {
        data && data.length === 0 ? <ActivityIndicator
          style={{
            marginTop: 10
          }}
          size="large"
          color="red"
        /> :
          <FlatList
            data={data}
            style={{ marginBottom: 10 }}
            renderItem={({ item, index }) => {
              return <View style={styles.postView}>
                <View style={styles.postTitle}>
                  <View style={styles.viewImage}>
                    <Image source={require("../../images/cash.jpeg")} style={styles.image} />
                    <View style={styles.namePoster}>
                      <Text style={{ color: "#000", fontSize: 16 }}>
                        {
                          users && users.map(val => {
                            if (val._id ===  item.posterId) {
                              return val.pseudo
                            }
                          })
                        }
                      </Text>

                      <Text>
                        Publié {dateParserFunction(item && item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Icon name='options-vertical' color={'#111'} />
                  </View>
                </View>

                <TouchableOpacity style={styles.touchableImage}
                  onPress={() => {
                    handleCountNumberViews(item)
                    navigation.navigate('videoPlayer', { data: item })
                  }}
                >
                  <Image source={require("../../images/sad.jpg")} style={styles.coverImage} />
                </TouchableOpacity>

                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                  {
                    item && item.title
                  }
                </Text>
              </View>

            }}
            keyExtractor={item => item && item._id}
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textInput: {
    height: 42,
    width: "75%",
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingLeft: 15,
    color: "#000",
    marginBottom: 10,
    marginTop: 10
  },
  postTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 1,
    alignItems: "center"
  },
  postView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: (0, 0, 0, 0.06)
  },
  viewImage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  namePoster: {
    display: "flex",
    flexDirection: "column",
  },
  touchableImage: {
    width: '100%',
    height: 200,
    backgroundColor: (0, 0, 0, 0.06),
    marginTop: 20,
  },
  coverImage: {
    width: '100%',
    height: "100%",
    backgroundColor: (0, 0, 0, 0.06),
    borderRadius: 10
  }
})

export default Videos