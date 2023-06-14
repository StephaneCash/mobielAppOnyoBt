import { TextInput, Text, View, Alert, Pressable } from 'react-native';
import DocumentPicker, {types } from 'react-native-document-picker'
import { useContext, useState } from 'react'
import Loader from '../videos/Loader';
import { ContextApp } from '../../context/AuthContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfil } from '../../reducers/User.reducer';

const EditUser = () => {
    const [uploading, setUploading] = useState(false)

    const isLoading = useSelector(state => state.users.loading);

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

            body.append('file', {
                uri: pickerResult.fileCopyUri,
                type: pickerResult.type,
                name: pickerResult.name,
                size: pickerResult.size,
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
            form.id = fullDataUserConnected && fullDataUserConnected._id && fullDataUserConnected._id;

            dispatch(changeProfil(form))

            setUploading(false)

        } catch (e) {
            console.log(e.response)
            handleError(e)
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
            <Text style={{
                fontSize: 16,
                fontWeight: "bold"
            }}>Change votre photo de profil</Text>
            {
                isLoading ? <Loader /> :
                    <Pressable
                        style={{
                            borderWidth: 1, borderColor: "silver",
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: "#0e6bf7",
                            width: "100%"
                        }}
                        onPress={handleUpload} >
                        <Text style={{ textAlign: "center", color: "#fff" }}>Choisir une image</Text>
                    </Pressable>
            }

        </View>
    );
};
export default EditUser;
