import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { ContextApp } from '../../context/AuthContext';


const Settings = () => {

  const navigationRoute = useNavigation();

  const { setUserConnected } = useContext(ContextApp);

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
      justifyContent: "center"
    }}>
      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, padding: 10,  }}
        onPress={()=>navigationRoute.navigate("editprofil")}
      >
        <Text>Modifier profil photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, padding: 10, marginTop: 10 }}
        onPress={logoutHandle}
      >
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings