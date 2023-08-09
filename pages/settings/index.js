import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { ContextApp } from '../../context/AuthContext';
import { Avatar } from "@react-native-material/core";
import { useSelector } from 'react-redux';
import { baseUrl, baseUrlFile } from '../../bases/basesUrl';
import axios from 'axios';

const Settings = () => {

  const navigationRoute = useNavigation();

  const { setUserConnected } = useContext(ContextApp);

  const userId = useSelector(state => state.user.value);

  const [user, setUser] = useState();

  const getOneUser = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users/${userId && userId._id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneUser();
  }, [userId]);

  const logoutHandle = async () => {
    try {
      await AsyncStorage.removeItem(
        'userConnected',
      );
      setUserConnected(null);
    } catch (error) {
      console.log(error)
    }
  };

  const url = user && user.url

  console.log(user, " USER SETTINGS")

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      backgroundColor: '#fff'
    }}>
      <Avatar label={user && user.pseudo && user.pseudo} size={100} color='#fff'
        style={{ backgroundColor: '#eee' }}
        image={{ uri: baseUrlFile + "/" + url }} />
      <Text style={{
        textAlign: "center", color: "#000", fontSize: 17
      }}>@{user && user.pseudo}</Text>

      <View style={{flexDirection:"row", gap:10}}>
        <TouchableOpacity
          style={{ borderRadius: 10, padding: 10, backgroundColor: "#eee" }}
          onPress={() => navigationRoute.navigate("editprofil")}
        >
          <Text style={{
            textAlign: "center", color: "#000", fontSize: 17
          }}>Modifier profil photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderRadius: 10, padding: 10, backgroundColor: "#eee" }}
          onPress={() => navigationRoute.navigate("editprofil")}
        >
          <Text style={{
            textAlign: "center", color: "#000", fontSize: 17
          }}>Ajout d'amis</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, padding: 10, width: "90%" }}
        onPress={logoutHandle}
      >
        <Text style={{
          textAlign: "center", color: "#000", fontSize: 17
        }}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings