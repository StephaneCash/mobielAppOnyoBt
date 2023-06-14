import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { rechargeCompte } from '../../reducers/Compte.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ContextApp } from '../../context/AuthContext';
import Loader from '../../pages/videos/Loader';

const RechargeCompte = () => {

    const [value, setvalue] = useState('');
    const { fullDataUserConnected } = useContext(ContextApp);

    const isLoading = useSelector(state => state.comptes.loading);

    let dispatch = useDispatch();

    const rechargeCompe = () => {
        const data = {};
        data.userId = fullDataUserConnected && fullDataUserConnected._id;
        data.num = value;
        dispatch(rechargeCompte(data));
    }
    return (
        <View style={styles.mainView}>
            <Text>RECHARGE COMPTE</Text>
            <TextInput style={styles.textInput}
                value={value} onChangeText={(value) => setvalue(value)}
                placeholder='Entrer votre code'
                placeholderTextColor={'#000'}
            />
            {
                isLoading ? <Loader /> :
                    <TouchableOpacity
                        onPress={() => rechargeCompe()}
                        style={{
                            flexDirection: 'column',
                            backgroundColor: "#0e6bf7",
                            elevation: 2,
                            borderRadius: 10,
                            width: "90%",
                            padding: 15,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "600",
                                color: "#fff"
                            }}
                        >RECHARGER</Text>
                    </TouchableOpacity>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    textInput: {
        height: 50,
        width: "90%",
        backgroundColor: "#ddd",
        borderRadius: 5,
        paddingLeft: 15,
        color: "#000",
        marginBottom: 10,
        marginTop: 10
    },
})

export default RechargeCompte