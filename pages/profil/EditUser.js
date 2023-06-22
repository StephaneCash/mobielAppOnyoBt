import {  Text, View, Alert, Pressable, TouchableOpacity } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker'
import { useContext, useState } from 'react'
import Loader from '../videos/Loader';
import { ContextApp } from '../../context/AuthContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { changeProfil } from '../../reducers/UserOne.reducer';


const EditUser = () => {

    const [uploading, setUploading] = useState(useSelector(state => state.users.loading));

    const navigation = useNavigation();

    const { fullDataUserConnected } = useContext(ContextApp);

    const handleError = (e) => {
        if (DocumentPicker.isCancel(e)) {
            Alert.alert('Vous avez abandonné')
        } else {
            Alert.alert('Unknown Error: ' + JSON.stringify(e))
        }
    }

    const dispatch = useDispatch();

    const handleUpload = async () => {
        try {

            setUploading(true)

            const pickerResult = await DocumentPicker.pickSingle({
                type: [types.images],
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            })

            const body = new FormData();

            body.append('image', {
                uri: pickerResult && pickerResult.fileCopyUri && pickerResult.fileCopyUri,
                type: pickerResult && pickerResult.type && pickerResult.type,
                name: pickerResult && pickerResult.name && pickerResult.name,
                size: pickerResult && pickerResult.size && pickerResult.size,
            })

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Disposition': 'form-data',
                }
            }

            let form = {};
            form.data = body;
            form.config = config;
            form.id = fullDataUserConnected && fullDataUserConnected._id;

            dispatch(changeProfil(form))

            setUploading(false)

        } catch (e) {
            console.log(e)
            handleError(e);
            setUploading(false)
        }
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                padding: 40,
                flexDirection: "column",
                gap: 20
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate('home')}
                style={{
                    flexDirection: 'column',
                    backgroundColor: "#fff",
                    elevation: 2,
                    borderRadius: 10,
                    width: '48%',
                    padding: 15
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "600",
                        color: '#000'
                    }}
                >Retour</Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#888"
            }}>Change votre photo de profil</Text>
            {
                uploading ? <Loader /> :
                    <Pressable
                        style={{
                            borderWidth: 1, borderColor: "silver",
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: "#0e6bf7",
                            width: "100%"
                        }}
                        onPress={handleUpload} >
                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>Choisir une image</Text>
                    </Pressable>
            }

        </View>
    );
};
export default EditUser;
