import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from '../../bases/basesUrl';
import axios from 'axios';
import dashboardStyles from '../Home/style';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgErr, setMsgErr] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigation();

    const handleAuth = () => {
        setLoading(true);
        axios.post(`${baseUrl}/users/login`, {
            email: email,
            password: password
        })
            .then(res => {
                let userInfo = res.data;
                setLoading(false);
                AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.pseudo));
                navigate.navigate('home');
            })
            .catch(err => {
                console.log(err, " ERREURS____________");
                setMsgErr(err && err.response && err.response.data && err.response.data.message);
                setLoading(false);
            })
    };

    useEffect(() => {
        setMsgErr('');
    }, []);

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
                CONNEXION
            </Text>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Image source={require("../../images/logo.jpeg")} style={dashboardStyles.userImg} />
            </View>

            <TextInput
                style={{
                    width: "70%",
                    backgroundColor: "#ddd",
                    paddingLeft: 15,
                    borderRadius: 10,
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
                onPress={() => handleAuth()}
                style={{
                    backgroundColor: email && password ? "#e80300" : "silver", padding: 15, borderRadius: 10, width: "70%", flexDirection: "column",
                    justifyContent: "center", alignItems: "center"
                }}
                disabled={email && password ? false : true}
            >
                <Text style={{ color: '#fff', fontSize: 17 }}>Connexion</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
                <Text style={{ color: '#0073bd', fontSize: 17, marginTop: 10 }}>Pas de compte ? </Text>
                <Text
                    onPress={() => navigate.navigate('signup')}
                    style={{ color: '#0073bd', fontSize: 17, marginTop: 10, fontWeight: 900 }}
                >
                    créer un ici
                </Text>
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: "red", fontSize: 17 }}>
                    {msgErr ? msgErr : ""}
                </Text>
            </View>

        </View >
    )
}

export default Login