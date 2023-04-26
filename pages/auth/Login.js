import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from '../../bases/basesUrl';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ContextApp } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigation();

    const { setUserConnected } = useContext(ContextApp)

    const userAuth = () => {
        setLoading(true);
        axios.post(`${baseUrl}/users/login`, {
            email: email,
            password: password
        })
            .then(async (res) => {
                const userInfo = res.data;
                const jsonValue = JSON.stringify(userInfo)
                setLoading(false);
                setUserConnected(userInfo);
                try {
                    await AsyncStorage.setItem(
                        'userConnected',
                        jsonValue,
                    );
                    navigate.navigate('home');
                } catch (error) {
                    console.log(error)
                }
            })
            .catch(err => {
                Alert.alert(err && err.response && err.response.data && err.response.data.message);
                setLoading(false);
            })
    };

    const validateForm = () => {
        const formInputs = [email, password];

        if (formInputs.includes('') || formInputs.includes(undefined)) {
            Alert.alert("Veuillez remplir tous les champs svp !")
            return;
        } else {
            userAuth();
        }
    }

    return (
        <View style={styles.mainView}>
            <Spinner visible={loading} color={"red"} />
            <View style={styles.logoView}>
                <Image source={require("../../images/logo.jpeg")} style={styles.logoImage} />
            </View>
            <View style={styles.formView}>
                <View>
                    <Text style={styles.text1}>
                        Se connecter
                    </Text>
                </View>
                <View style={styles.formMain}>
                    <TextInput
                        placeholder='Entrer votre adresse email*'
                        style={styles.textInput}
                        placeholderTextColor={'#fff'}
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                    />

                    <TextInput
                        placeholder='Mot de passe*'
                        style={styles.textInput}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />

                    <TouchableOpacity style={styles.button} onPress={validateForm}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnSignUp} onPress={() => navigate.navigate('signup')}>
                    <Text style={styles.signUpText}>
                        Pas de compte ? S'inscrire
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    logoView: {
        width: "100%",
        height: "40%",
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
        marginTop: 10
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
        fontSize: 16
    }
})

export default Login;