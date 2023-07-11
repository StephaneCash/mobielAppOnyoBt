import { View, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, Text, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
import Feather from 'react-native-vector-icons/Feather';
import ListVideos from './ListVideos.js';
import { getAllPosts } from '../../reducers/Posts.reducer.js';
import { Modal } from 'react-native';

const Videos = () => {

  const [valueSearch, setValueSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const data = useSelector(state => state.posts.value);

  const navigation = useNavigation();

  const handleAddVideoOrStartLive = () => {
    setShowModal(true)
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!showModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Que voulez-vous faire ?</Text>

              <View style={styles.btnsModal}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setShowModal(!showModal);
                    navigation.navigate('live/add')
                  }}>
                  <Text style={styles.textStyle}>Démarrer un live</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setShowModal(!showModal);
                    navigation.navigate('videos/add')
                  }}>
                  <Text style={styles.textStyle}>Publier une vidéo</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.mainView}>
        <TextInput style={styles.textInput}
          value={valueSearch} onChangeText={(value) => setValueSearch(value)}
          placeholder='Rechercher...'
          placeholderTextColor={'#000'}
        />

        <TouchableOpacity onPress={() => {
          handleAddVideoOrStartLive()
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
  centeredView: {
    marginTop: 22,
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: "#333",
  },
  btnsModal: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20
  }
})

export default Videos