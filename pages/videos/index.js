import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux"
import { baseUrl } from '../../bases/basesUrl';
import { ContextApp } from '../../context/AuthContext';
import { dateParserFunction } from '../../outils/constantes';

const Videos = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const dispatch = useDispatch();

  const { fullDataUserConnected } = useContext(ContextApp);

  const [data, setData] = useState([]);

  const getDataAll = () => {
    setLoading(true)
    fetch(`${baseUrl}/posts`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        dispatch({
          type: "add",
          payload: data.items
        })
        setData(data)
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
      <View style={styles.mainView}>
        <TextInput style={styles.textInput}
          value={valueSearch} onChangeText={(value) => setValueSearch(value)}
          placeholder='Rechercher...'
          placeholderTextColor={'#000'}
        />
      </View>
      {
        data && data.length < 0 ? <ActivityIndicator
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
                          fullDataUserConnected && fullDataUserConnected.pseudo && fullDataUserConnected.pseudo
                        }
                      </Text>
                      <Text>
                        Publié {dateParserFunction(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Icon name='options-vertical' color={'#111'} />
                  </View>
                </View>

                <TouchableOpacity style={styles.touchableImage}
                  onPress={() => navigation.navigate('videoPlayer', { data: item })}
                >
                  <Image source={require("../../images/img1.jpeg")} style={styles.coverImage} />
                </TouchableOpacity>
              </View>
            }}
            keyExtractor={item => item._id}
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#fff",
    alignItems: "center"
  },
  textInput: {
    height: 42,
    width: "90%",
    backgroundColor: "#ddd",
    borderRadius: 20,
    paddingLeft: 15,
    color: "#000",
    marginBottom: 20,
    marginTop: 20
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