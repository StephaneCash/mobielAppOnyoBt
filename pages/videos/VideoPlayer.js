import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, ActivityIndicator, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Video from 'react-native-video';
import { baseUrlFile } from '../../bases/basesUrl';
import { dateParserFunction } from '../../outils/constantes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { ContextApp } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { commentPost, getAllPosts, likePostHanlde } from '../../reducers/Posts.reducer';
import { Avatar } from "@react-native-material/core";

const VideoPlayer = ({ route, navigation }) => {

    const { height } = Dimensions.get("screen");

    const [isLike, setIsLike] = useState(0);
    const [valueComment, setValueSearch] = useState('');
    const dispatch = useDispatch();
    const { fullDataUserConnected } = useContext(ContextApp);
    const [showComment, setShowComment] = useState(false);

    const [post, setPost] = useState()
    const [nom, setNom] = useState()

    const data = useSelector(state => state.posts.value);
    const users = useSelector(state => state.users.value);

    useEffect(() => {
        post && post.comments && post.comments.map((val, index) => {
            if (index === 0) {
                let name = val.commenterPseudo && val.commenterPseudo.split('')[0]
                return setNom(name)
            }
        })
    }, [route.params && route.params.data, dataArr])

    const dataArr = useSelector(state => state.posts.value)

    const likePost = () => {
        let data = {}
        data.idPost = route && route.params && route.params.data && route.params.data._id;
        data.id = fullDataUserConnected && fullDataUserConnected._id;
        dispatch(likePostHanlde(data))
        dispatch(getAllPosts())
    }

    const commeentPost = () => {
        let data = {}
        let form = {};
        data.idPost = route && route.params && route.params.data && route.params.data._id;
        form.commenterId = fullDataUserConnected && fullDataUserConnected._id;
        form.text = valueComment;
        form.commenterPseudo = fullDataUserConnected && fullDataUserConnected.pseudo;
        data.form = form;
        dispatch(commentPost(data))
        dispatch(getAllPosts())
    }

    const disLikePost = () => {
        setIsLike(2);
    }

    useEffect(() => {
        dataArr && dataArr.map(val => {
            if (route && route.params && route.params.data && route.params.data._id === val._id) {
                let value = val;
                setPost(value)
                return setPost(value)
            }
        })
    }, [route.params && route.params.data, dataArr])

    useEffect(() => {
        dataArr && dataArr.map(val => {
            return val.likers && val.likers.map(value => {
                //console.log(value, " ICI CEST DATA")
                if (fullDataUserConnected && fullDataUserConnected._id === value) {
                    //    console.log(value && fullDataUserConnected._id, value, " TEST VLAUE")
                    return setIsLike(1);
                } else {
                    return setIsLike(0);
                }
            })
        })
    }, [dataArr])

    const showMoreComments = () => {
        setShowComment(!showComment)
    };

    let arrIndex = []

    return (
        <View style={styles.mainPlayerView}>
            <View style={{ height: height / 3.9, backgroundColor: "gray", width: "100%" }}>
                <Video
                    style={styles.videoP}
                    source={{ uri: post && baseUrlFile + post.video }}
                    controls={true}
                    resizeMode="contain"
                    isLooping

                />
            </View>
            <Text
                style={{
                    width: "98%", padding: 13, color: '#000', fontWeight: "bold"
                }}
            >{post && post.title.replace(/yt1s\.io\-/g, "").split("&")[0]}</Text>

            {
                post && post.description &&
                <Text
                    style={{
                        width: "98%", padding: 13, color: '#000',
                    }}
                >{post && post.description}</Text>
            }
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 13,
                }}
            >
                <Text>
                    Publié {dateParserFunction(post && post.createdAt)}
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
                    <TouchableOpacity style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                        onPress={likePost}
                    >
                        {
                            isLike === 1 ? <AntDesign size={30} name='like1' color={"#0668b4"} /> : <AntDesign size={30} name='like2' />
                        }
                        <Text>
                            {
                                post && post.likers && post.likers.length
                            }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                        onPress={disLikePost}
                    >
                        {
                            isLike === 2 ? <AntDesign size={30} name='dislike1' color={"#0668b4"} /> : <AntDesign size={30} name='dislike2' />
                        }
                        <Text>0</Text>
                    </TouchableOpacity>
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

            <View
                style={{
                    width: "95%",
                    padding: 13,
                    backgroundColor: "#0668b4",
                    marginRight: 13,
                    marginLeft: 13,
                    borderRadius: 5,
                    justifyContent: "center",
                    gap: 10,
                    maxHeight: showComment ? "100%" : 70,
                    flex: 1,
                }}
            >

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{}}>
                        <Text style={{ color: "#fff" }}>
                            Commentaires : {post && post.comments.length}
                        </Text>
                    </View>
                    <TouchableOpacity style={{}} onPress={showMoreComments}>
                        <Text style={{ color: "#fff" }}>
                            Voir plus
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    showComment &&
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10
                        }}
                    >
                        <TextInput style={styles.textInput}
                            value={valueComment} onChangeText={(value) => setValueSearch(value)}
                            placeholder='Votre commentaire...'
                            placeholderTextColor={'#000'}
                        />
                        <TouchableOpacity style={styles.button} onPress={commeentPost} >
                            <Text style={styles.textButton}>Commenter</Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    showComment &&
                    <FlatList
                        data={post && post.comments && post.comments}
                        style={{ marginBottom: 10, flex: 1, display: "flex" }}
                        renderItem={({ item, index }) => {
                            return users.map(user => {
                                arrIndex.push(index)
                                if (user._id === item.commenterId) {
                                    return <View key={index} style={{
                                        flexDirection: "column",
                                        flex: 1
                                    }}>
                                        <View style={styles.viewComment} >
                                            <Avatar label={item.commenterPseudo} size={30} color='#fff'
                                                image={{ uri: "https://mui.com/statisc/images/avatar/1.jpg" }} />
                                            <Text key={index} style={{ color: "#fff" }}>{item.text}</Text>
                                        </View>
                                    </View>
                                }
                            })
                        }}
                        keyExtractor={item => item._id}
                    />
                }


            </View>

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
                                if (item && route.params && route.params.data && route.params.data._id !== item._id) {
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
                                                        Publié {dateParserFunction(item && item.createdAt)}
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
                                                item && item.title
                                            }
                                        </Text>
                                    </View>
                                }
                            }}
                            keyExtractor={item => item && item._id}
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
        width: "50%",
        borderRadius: 20,
        paddingLeft: 15,
        color: "#000",
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
        flexDirection: 'row',
        alignItems: "center",
        gap: 10
    },
    button: {
        width: "25%",
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#444"
    },
    textInput: {
        height: 42,
        width: "70%",
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingLeft: 15,
        color: "#000",
    },

})

export default VideoPlayer