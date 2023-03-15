import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const handleAuth = () => {
        if (!email) {
            Alert.alert("Veuillez entrer votre adresse email svp.")
        } else if (!password) {
            Alert.alert("Veuillez entrer votre mot de passe svp.")
        } else {
            if (email === "kikonistephane@gmail.com" && password === "cash") {
                navigate.navigate('home')
            } else {
                Alert.alert("Votre mot de passe ou adresse email est incorrect")
            }
        }
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
            <Text
                style={{
                    fontSize: 20
                }}
            >
                Bienvue sur OnyoBt
            </Text>

            <MaterialCommunityIcons
                name="account-circle"
                color={"#333"} size={50}
                style={{
                    marginTop: 22,
                    marginBottom: 22
                }}
            />

            <TextInput
                style={{
                    width: "70%",
                    backgroundColor: "#ddd",
                    paddingLeft: 15,
                    borderRadius: 56
                }}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={{
                    width: "70%",
                    backgroundColor: "#ddd",
                    paddingLeft: 15,
                    borderRadius: 56,
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
                    backgroundColor: 'red', padding: 15, borderRadius: 4, width: "70%", flexDirection: "column",
                    justifyContent: "center", alignItems: "center"
                }}
            >
                <Text style={{ color: '#fff', fontSize: 17 }}>Connexion</Text>
            </TouchableOpacity>
            <Text style={{ color: '#000', fontSize: 17, marginTop: 30 }}>Ou connectez-vous avec</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10
                }}
            >
                <MaterialCommunityIcons
                    name="google"
                    color={"red"} size={30}
                    style={{
                        marginTop: 22,
                        marginBottom: 22,
                    }}
                />
                <MaterialCommunityIcons
                    name="facebook"
                    color={"#0e6bf7"} size={30}
                    style={{
                        marginTop: 22,
                        marginBottom: 22
                    }}
                />
                <MaterialCommunityIcons
                    name="linkedin"
                    color={"#0e6bf7"} size={30}
                    style={{
                        marginTop: 22,
                        marginBottom: 22
                    }}
                />
            </View>

            <View
                style={{
                    borderTopWidth: 1
                }}
            >
                <Text
                    style={{
                        marginTop: 10
                    }}
                >App Développée par l'équipe ONYO-BT</Text>
            </View>
        </View>
    )
}

export default Login