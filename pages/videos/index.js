import { View, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {  useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
import Feather from 'react-native-vector-icons/Feather';
import ListVideos from './ListVideos.js';
import { getAllPosts } from '../../reducers/Posts.reducer.js';


const Videos = () => {
  
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts());
}, []);

  const data = useSelector(state => state.posts.value);

  const navigation = useNavigation();

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
          <Feather name="plus" color={"#666"} size={30} />
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
          <ListVideos valueSearch={valueSearch} />
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
})

export default Videos