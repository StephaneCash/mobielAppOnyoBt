import React from 'react';
import { View, Text, FlatList,  StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import  { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux"
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../bases/basesUrl.js';
import moment from 'moment';
import { getAllPosts, viewPost } from '../../reducers/Posts.reducer.js';
import { addSoldeCompte, reduceCompte } from '../../reducers/Compte.reducer.js';
import { ContextApp } from '../../context/AuthContext.js';

const ListVideos = () => {

    const navigation = useNavigation();

    const { fullDataUserConnected } = useContext(ContextApp);

    const dispatch = useDispatch();
    moment.locale('fr');

    const data = useSelector(state => state.posts.value);
    const users = useSelector(state => state.users.value);
    const compte = useSelector(state => state.comptes.value);

    const views = [];

    const handleCountNumberViews = (item) => {
        let form = {}
        form.postId = item && item._id;
        form.id = fullDataUserConnected && fullDataUserConnected._id;
        views.push(item.posterId)

        dispatch(viewPost(form));
    };

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    const viewPlayerVideo = (item) => {
        if (compte && compte.solde > 0.002) {
            dispatch(reduceCompte(fullDataUserConnected && fullDataUserConnected._id));
            navigation.navigate('videoPlayer', { data: item });
        } else {
            Alert.alert('Votre solde est insuffisant pour regarder cette vidéo')
        }
    }

    const addSolde = (item) => {
        let userA = {}
        userA.uid = fullDataUserConnected && fullDataUserConnected._id;
        userA.id = item && item.posterId && item.posterId
        dispatch(addSoldeCompte(userA));
    }

    return (
        <FlatList
            data={data}
            style={{ marginBottom: 10 }}
            renderItem={({ item, index }) => {
                return <View style={styles.postView} key={item && item._id}>
                    <View style={styles.postTitle}>
                        <View style={styles.viewImage}>
                            {
                                users && users.map(val => {
                                    if (item && item.posterId && item.posterId === val._id) {
                                        return <Avatar key={val._id} style={{ backgroundColor: "silver", }} tintColor='#fff'
                                            label={val && val.pseudo && val.pseudo} size={40} color='#fff'
                                            image={{ uri: val && baseUrlFile + "/" + val.url }} />
                                    }
                                })
                            }

                            <View style={styles.namePoster}>
                                <Text style={{ color: "#000", fontSize: 16 }}>
                                    {
                                        users && users.map(val => {
                                            if (item && item.posterId && item.posterId === val._id) {
                                                return val.pseudo
                                            }
                                        })
                                    }
                                </Text>

                                <Text style={{ color: '#444' }}>
                                    {moment(item && item.createdAt).fromNow()}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: "#000" }}>
                                {
                                    item && item.views && item.views.length
                                } {" "} vues
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.touchableImage}
                        onPress={() => {
                            viewPlayerVideo(item)
                            addSolde(item)
                            handleCountNumberViews(item)
                        }}
                    >
                        <Image source={require("../../images/sad.jpg")} style={styles.coverImage} />
                    </TouchableOpacity>

                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                        {
                            item && item.title
                        }
                    </Text>
                </View>

            }}

            keyExtractor={(item) => item && item._id}
        />
    )
}

export default ListVideos


const styles = StyleSheet.create({
    postTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
        alignItems: "center"
    },
    postView: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: (0, 0, 0, 0.06)
    },
    viewImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    namePoster: {
        display: "flex",
        flexDirection: "column",
    },
    touchableImage: {
        width: '100%',
        height: 200,
        backgroundColor: (0, 0, 0, 0.06),
        marginTop: 20,
    },
    coverImage: {
        width: '100%',
        height: "100%",
        backgroundColor: (0, 0, 0, 0.06),
        borderRadius: 10
    }
})
