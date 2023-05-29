import React, {  useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from '../../bases/basesUrl';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const SignUp = () => {

  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState("");
  const [numTel, setNumTel] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  const createUser = () => {
    setLoading(true);
    axios.post(`${baseUrl}/users/register`, {
      email: email,
      pseudo: pseudo,
      numTel: numTel,
      password: password
    })
      .then(res => {
        setLoading(false);
        navigate.navigate('login');
        Alert.alert(res && res.data && res.data.message);
      })
      .catch(err => {
        Alert.alert(err && err.response && err.response.data && err.response.data.message);
        setLoading(false);
      })
  };

  const validateForm = () => {
    const formInputs = [pseudo, email, numTel, password, confirmPass];
    const passwords_match = password === confirmPass;

    if (formInputs.includes('') || formInputs.includes(undefined)) {
      Alert.alert("Veuillez remplir tous les champs svp !")
      return;
    }

    if (passwords_match) return createUser();
    else {
      Alert.alert("Les mots de passe ne correspondent pas.")
      return;
    }
  }

  return (
    <View style={styles.mainView}>
      <Spinner visible={loading} color={"red"} />
      <View style={styles.logoView}>
        <Image source={require("../../images/logo.jpeg")} style={styles.logoImage} />
      </View>
      <View style={styles.formView}>
        <View style={styles.formMain}>
          <TextInput
            placeholder='Entrer votre nom*'
            style={styles.textInput}
            placeholderTextColor={'#fff'}
            value={pseudo}
            onChangeText={(value) => setPseudo(value)}
          />
          <TextInput
            placeholder='Adresse email*'
            style={styles.textInput}
            placeholderTextColor={'#fff'}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            placeholder='Numéro de téléphone*'
            style={styles.textInput}
            placeholderTextColor={'#fff'}
            value={numTel}
            onChangeText={(value) => setNumTel(value)}
          />
          <TextInput
            placeholder='Mot de passe*'
            style={styles.textInput}
            placeholderTextColor={'#fff'}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TextInput
            placeholder='Confirmer le mot de passe*'
            style={styles.textInput}
            placeholderTextColor={'#fff'}
            secureTextEntry={true}
            value={confirmPass}
            onChangeText={(value) => setConfirmPass(value)}
          />

          <TouchableOpacity style={styles.button} onPress={validateForm}>
            <Text style={styles.textButton}>S'inscrire</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnSignUp} onPress={() => navigate.navigate('login')}>
          <Text style={styles.signUpText}>
            Connectez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  logoView: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  formView: {
    width: "100%",
    height: "70%",
    backgroundColor: "#006abd",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  logoImage: {
    width: "30%",
    resizeMode: "contain"
  },
  text1: {
    color: '#fff',
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30
  },
  formMain: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  textInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "#fff",
    fontSize: 16
  },
  button: {
    width: "90%",
    height: 52,
    backgroundColor: '#f60501',
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff"
  },
  btnSignUp: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20
  },
  signUpText: {
    color: "#fff",
    fontSize: 15
  }
})

export default SignUp;