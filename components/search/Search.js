import { View, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MiniCard from '../MiniCard';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const arr = useSelector(state => {
        return state
    })

    const getData = () => {
        setLoading(true);
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}songs&type=video&key=AIzaSyD31fgEYyb7M2HmnrPS_CZMwjjwBa25ylA`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                dispatch({
                    type: "add",
                    payload: data.items
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View>
            <View
                style={{
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    elevation: 5,
                    backgroundColor: '#fff',
                    alignItems: "center"
                }}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    color={"#333"} size={35}
                    onPress={() => navigation.navigate('home')}
                />
                <TextInput
                    style={{
                        width: "70%",
                        backgroundColor: "#ddd",
                        paddingLeft: 15,
                        borderRadius: 56
                    }}
                    value={value}
                    placeholder="Rechercher..."
                    onChangeText={(text) => setValue(text)}
                />
                <MaterialCommunityIcons
                    name="send"
                    color={"#333"} size={35}
                    onPress={() => getData()}
                />
            </View>

            {
                loading ? <ActivityIndicator
                    style={{
                        marginTop: 10
                    }}
                    size="large"
                    color="red"
                /> : null
            }

            <FlatList
                style={{
                    marginBottom: 90
                }}
                data={arr}
                renderItem={({ item }) => {
                    return <MiniCard
                        videoId={item.id.videoId}
                        title={item.snippet.title}
                        channel={item.snippet.channelTitle}
                        publishTime={item.snippet.publishTime}
                        description={item.snippet.description}
                    />
                }}
                keyExtractor={item => item.id.videoId}
            />
        </View>
    )
}

export default Search