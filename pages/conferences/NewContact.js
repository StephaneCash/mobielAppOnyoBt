import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import axios from 'axios';
import { baseUrl } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import { ContextApp } from '../../context/AuthContext';

const NewContact = ({ route }) => {

    const { fullDataUserConnected } = useContext(ContextApp);
    const userIdConnected = fullDataUserConnected && fullDataUserConnected._id

    const [contactNom, setContactNom] = useState("");
    const [num, setNum] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const { height } = Dimensions.get("screen");
    const [compteFind, setCompteFind] = useState();

    const navigation = useNavigation();

    const handleChange = (value) => {
        setNum(value)
        searchContactByNum(value);
    };

    const searchContactByNum = async (value) => {
        try {
            const { data } = await axios.get(`${baseUrl}/comptes/single/${value}`);
            setCompteFind(data);
        } catch (error) {
            console.log(error, " ERREUR GET ACCOUNT USER BY NUMERO");
            setCompteFind('')
        }
    };

    const getAllUsers = route && route.params && route.params.getAllUsers
    const getOneUser = route && route.params && route.params.getOneUser;

    const newNumHandle = async () => {
        try {
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (regex.test(contactEmail)) {
                if (compteFind) {
                    const data = await axios.patch(`${baseUrl}/users/add-contact/${userIdConnected}`, {
                        contactId: compteFind && compteFind.userId,
                        contactNom: contactNom,
                        contactEmail: contactEmail,
                    });
                    if (data.status === 200) {
                        setNum('');
                        setCompteFind('');
                        Alert.alert('Contact ajouté avec succès.')
                        navigation.navigate('conferences')
                        getAllUsers();
                        getOneUser();
                    }
                } else {
                    Alert.alert('Numéro non connu.')
                }
            } else {
                Alert.alert('Adresse email invalide.')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={{
            backgroundColor: "#fff", flex: 1,
            flexDirection: "column", alignItems: "center",
        }}>
            <Text style={{
                color: "#fff", height: height / 5, fontSize: 20,
                backgroundColor: "#2366af", width: "100%", textAlign: "center",
                verticalAlign: "middle",
                marginBottom: 30
            }}>Nouveau contact</Text>

            <ScrollView >
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                    <Avatar style={{ backgroundColor: "#eee" }} tintColor='#fff' icon={<Feather name='user' color={"silver"} size={28} />}
                        size={100} color='#fff' />
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#eee",
                            borderRadius: 30,
                            marginBottom: 20,
                            marginTop: 30
                        }}
                    >
                        <Feather
                            name='user'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                        />
                        <TextInput
                            value={contactNom}
                            onChangeText={(value) => setContactNom(value)}
                            style={{
                                height: 50,
                                borderColor: '#ddd',
                                backgroundColor: "#eee",
                                color: "#111",
                                width: "80%"
                            }} placeholder="Entrer le nom complet" placeholderTextColor={"#333"} />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#eee",
                            borderRadius: 30,
                            marginBottom: 20,
                        }}
                    >
                        <Feather
                            name='phone'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                        />
                        <TextInput
                            value={num}
                            onChangeText={(value) => handleChange(value)}
                            style={{
                                height: 50,
                                borderColor: '#ddd',
                                backgroundColor: "#eee",
                                color: "#111",
                                width: "80%"
                            }} placeholder="Entrer un numéro onyobt" placeholderTextColor={"#333"} />
                    </View>

                    {
                        compteFind && (
                            <View style={{ marginBottom: 15, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Text style={{ color: "#333", fontSize: 14 }}>Compte trouvé : </Text>
                                <Text style={{ color: "#fff", textAlign: "left", backgroundColor: "#333", padding: 5, borderRadius: 7 }}>
                                    {compteFind ? compteFind.userId && compteFind.userId.pseudo : " 0 compte trouvé."}
                                </Text>
                            </View>
                        )
                    }

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#eee",
                            borderRadius: 30,
                            marginBottom: 20,
                        }}
                    >
                        <Feather
                            name='mail'
                            size={25}
                            color={'#333'}
                            style={{ fontWeight: "bold" }}
                        />
                        <TextInput
                            value={contactEmail}
                            onChangeText={(value) => setContactEmail(value)}
                            style={{
                                height: 50,
                                borderColor: '#ddd',
                                backgroundColor: "#eee",
                                color: "#111",
                                width: "80%"
                            }} placeholder="Entrer une adresse email" placeholderTextColor={"#333"} />
                    </View>

                    <View style={{
                        flexDirection: "row", alignItems: "center",
                        justifyContent: "center", marginTop: 50, width: "100%",
                        gap: 10
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('conferences')}
                            style={{
                                width: '45%', borderWidth: 1,
                                backgroundColor: "#ddd", padding: 10, borderRadius: 3, borderColor: "#ddd"
                            }}>
                            <Text style={{ color: "#999", textAlign: "center", fontSize: 16 }}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => newNumHandle()}
                            style={{
                                width: '45%', borderWidth: 0, backgroundColor: "#2366af",
                                padding: 10, borderRadius: 3
                            }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default NewContact