import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { ContextApp } from '../../context/AuthContext';
import { Avatar } from "@react-native-material/core";
import { useSelector } from 'react-redux';
import { baseUrlFile } from '../../bases/basesUrl';

const Settings = () => {

  const navigationRoute = useNavigation();

  const { setUserConnected, fullDataUserConnected } = useContext(ContextApp);

  const user = useSelector(state => state.users.value)

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

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20
    }}>
      {user && user.map(val => {
        if (fullDataUserConnected && fullDataUserConnected._id === val._id) {
          return <Avatar key={val._id} label={val && val.pseudo && val.pseudo} size={200} color='#fff'
            image={{ uri: val && baseUrlFile + "/" + val.url }} />
        }
      })}

      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, padding: 10, width: "90%" }}
        onPress={() => navigationRoute.navigate("editprofil")}
      >
        <Text style={{
          textAlign: "center", color: "#000", fontSize: 17
        }}>Modifier profil photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, padding: 10, width: "90%" }}
        onPress={logoutHandle}
      >
        <Text  style={{
          textAlign: "center", color: "#000", fontSize: 17
        }}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings