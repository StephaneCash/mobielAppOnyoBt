import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Video from 'react-native-video';
import { baseUrlFile } from '../../bases/basesUrl';
import { dateParserFunction } from '../../outils/constantes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { ContextApp } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Stack, Avatar } from "@react-native-material/core";

const VideoPlayer = ({ route, navigation }) => {

    const { height } = Dimensions.get("screen");

    const { fullDataUserConnected } = useContext(ContextApp);

    const data = useSelector(state => state.posts.value);
    const users = useSelector(state => state.users.value);

    const [comment, setComment] = useState('');

    const tailleComments = route.params && route.params.data && route.params.data.comments && route.params.data.comments.length;

    let nom = "";

    route.params && route.params.data && route.params.data.comments && route.params.data.comments.map((val, index) => {
        if (index === 0) {
            nom = val.commenterPseudo && val.commenterPseudo.split('')[0]
        }
    })

    return (
        <View style={styles.mainPlayerView}>
            <View style={{ height: height / 3.9, backgroundColor: "gray", width: "100%" }}>
                <Video
                    style={styles.videoP}
                    source={{ uri: baseUrlFile + route.params.data.video }}
                    controls={true}
                    resizeMode="contain"
                    isLooping

                />
            </View>
            <Text
                style={{
                    width: "98%", padding: 13, color: '#000', fontWeight: "bold"
                }}
            >{route.params && route.params.data && route.params.data.title.replace(/yt1s\.io\-/g, "").split("&")[0]}</Text>
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 13,
                }}
            >
                <Text>
                    Publié {dateParserFunction(route.params && route.params.data && route.params.data.createdAt)}
                </Text>
            </View>

            <View style={{
                width: "100%",
                paddingHorizontal: 13,
                marginTop: 20,
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "35%"
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <AntDesign size={30} name='like2' />
                        <Text>15 k</Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <AntDesign size={30} name='dislike2' />
                        <Text>15</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <MaterialCommunityIcons size={30} name='share-outline' />
                        <Text>Partager</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <AntDesign size={30} name='download' />
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    width: "95%",
                    padding: 13,
                    backgroundColor: "#0b6cc7d0",
                    marginRight: 13,
                    marginLeft: 13,
                    borderRadius: 5,
                    minHeight: 70,
                    justifyContent: "center",
                    gap: 10,
                }}
            >
                <Text
                    style={{
                        color: "#fff"
                    }}
                >
                    Commentaires : {
                        tailleComments
                    }
                </Text>

                {
                    tailleComments > 0 &&
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width:"100%"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10
                            }}
                        >
                            <Avatar label={nom} size={30} color='#fff' image={{ uri: "https://mui.com/statisc/images/avatar/1.jpg" }} />

                            <SafeAreaView style={{
                                width:"80%"
                            }} >
                                <FlatList
                                    data={route.params && route.params.data && route.params.data.comments && route.params.data.comments}
                                    style={{ marginBottom: 10 }}
                                    renderItem={({ item, index }) => {
                                        return users.map(user => {
                                            if (user._id === item.commenterId) {
                                                return index === 0 && <View style={styles.viewComment}>
                                                    <Text key={index} style={{ color: "#fff" }}>{item.text}</Text>
                                                </View>
                                            }
                                        })
                                    }}
                                    keyExtractor={item => item._id}
                                />
                            </SafeAreaView>
                        </View>

                        <TouchableOpacity>
                            <EvilIcons name='chevron-down' size={35} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                }

            </TouchableOpacity>

            <View
                style={{ flex: 1 }}
            >
                {
                    data && data.length < 0 ? <ActivityIndicator
                        style={{
                            marginTop: 10
                        }}
                        size="large"
                        color="red"
                    /> :
                        <FlatList
                            data={data}
                            style={{ marginBottom: 10 }}
                            renderItem={({ item }) => {
                                if (route.params && route.params.data && route.params.data._id !== item._id) {
                                    return <View style={styles.postView}>
                                        <View style={styles.postTitle}>
                                            <View style={styles.viewImage}>
                                                <Image source={require("../../images/cash.jpeg")} style={styles.image} />
                                                <View style={styles.namePoster}>
                                                    <Text style={{ color: "#000", fontSize: 16 }}>
                                                        {
                                                            users && users.map(val => {
                                                                if (val._id === item.posterId) {
                                                                    return val.pseudo
                                                                }
                                                            })
                                                        }
                                                    </Text>
                                                    <Text>
                                                        Publié {dateParserFunction(item.createdAt)}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Icon name='options-vertical' color={'#111'} />
                                            </View>
                                        </View>

                                        <TouchableOpacity style={styles.touchableImage}
                                            onPress={() => {
                                                navigation.navigate('videoPlayer', { data: item })
                                            }}
                                        >
                                            <Image source={require("../../images/sad.jpg")} style={styles.coverImage} />
                                        </TouchableOpacity>
                                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                                            {
                                                item.title
                                            }
                                        </Text>
                                    </View>
                                }
                            }}
                            keyExtractor={item => item._id}
                        />
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainPlayerView: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    postTitle: {
        fontWeight: 'bold',
        marginTop: 0,
        color: "#000",
        width: "100%",
        fontSize: 16,
        paddingHorizontal: 13
    },
    videoP: {
        flex: 1,
        alignSelf: "stretch",
        height: "10%"
    },
    mainView: {
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    textInput: {
        height: 42,
        width: "75%",
        backgroundColor: "#ddd",
        borderRadius: 20,
        paddingLeft: 15,
        color: "#000",
        marginBottom: 10,
        marginTop: 10
    },
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
    },
    imagesComment: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    viewComment: {
        paddingRight: 13,
    },

})

export default VideoPlayer