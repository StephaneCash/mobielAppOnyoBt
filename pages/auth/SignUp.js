import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from '../../bases/basesUrl';
import axios from 'axios';
import dashboardStyles from '../Home/style';
import Spinner from 'react-native-loading-spinner-overlay/lib';


const SignUp = () => {

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigation();

  const handleSignUp = () => {
    setLoading(true);
    axios.post(`${baseUrl}/users/register`, {
      pseudo: pseudo,
      email: email,
      password: password
    })
      .then(() => {
        setLoading(false);
        navigate.navigate('login')
        dispatch({
          type: "signup",
          payload: {
            isAdd: true
          }
        })
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner visible={loading} color={"red"} />
      <Text
        style={{
          fontSize: 20
        }}
      >
        INSCRIPTION
      </Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Image source={require("../../images/logo.jpeg")} style={dashboardStyles.userImg} />
      </View>

      <TextInput
        style={{
          width: "70%",
          backgroundColor: "#ddd",
          paddingLeft: 15,
          borderRadius: 10
        }}
        placeholder="Pseudo"
        onChangeText={(text) => setPseudo(text)}
      />

      <TextInput
        style={{
          width: "70%",
          backgroundColor: "#ddd",
          paddingLeft: 15,
          marginTop: 20,
          borderRadius: 10
        }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={{
          width: "70%",
          backgroundColor: "#ddd",
          paddingLeft: 15,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20
        }}
        secureTextEntry={true}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => handleSignUp()}
        style={{
          backgroundColor: '#e80300', padding: 15, borderRadius: 10, width: "70%", flexDirection: "column",
          justifyContent: "center", alignItems: "center"
        }}
      >
        <Text style={{ color: '#fff', fontSize: 17 }}>Inscription</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10, flexDirection: "column", gap: 5 }}>
        <Text style={{ color: '#0073bd', fontSize: 17, marginTop: 10 }}>Avez-vous déjà un de compte ? </Text>
        <Text
          onPress={() => navigate.navigate('login')}
          style={{ color: '#0073bd', fontSize: 17, marginTop: 10, fontWeight: 900 }}
        >
          Connectez-vous ici
        </Text>
      </View>

    </View>
  )
}

export default SignUp