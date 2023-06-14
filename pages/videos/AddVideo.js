import { TextInput, Text, View, Alert, Pressable } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import { useContext, useState } from 'react'
import Loader from './Loader.js';
import { ContextApp } from '../../context/AuthContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../reducers/Posts.reducer.js';

const AddVideo = () => {
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState("");

    const isLoading = useSelector(state => state.posts.loading);

    const { userConnected } = useContext(ContextApp);

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
                type: ['video/*'],
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            })

            const body = new FormData();

            body.append('file', {
                uri: pickerResult.fileCopyUri,
                type: pickerResult.type,
                name: pickerResult.name,
            })

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Disposition': 'form-data',
                }
            }

            body.append('posterId', userConnected && userConnected.user)
            body.append('description', message);

            let form = {};
            form.data = body;
            form.config = config;
            

           dispatch(createPost(form))

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
            }}>Publier vos vidéos</Text>
            <TextInput style={{
                height: 100,
                width: "100%",
                backgroundColor: "#ddd",
                borderRadius: 20,
                paddingLeft: 15,
                color: "#000",
            }}
                value={message} onChangeText={(value) => setMessage(value)}
                placeholder='Votre message'
                placeholderTextColor={'#000'}
            />
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
                        <Text style={{ textAlign: "center", color: "#fff" }}>Choisir une vidéo</Text>
                    </Pressable>
            }

        </View>
    );
};
export default AddVideo;
