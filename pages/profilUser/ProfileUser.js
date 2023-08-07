import { View, Text, StyleSheet, TouchableOpacity, Share, Dimensions, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar } from "@react-native-material/core";
import { baseUrl, baseUrlFile } from '../../bases/basesUrl';
import Video from 'react-native-video';
import axios from 'axios';
import { ContextApp } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { viewPost } from '../../reducers/Posts.reducer';
import { addSoldeCompte, reduceCompte } from '../../reducers/Compte.reducer';
import Feather from "react-native-vector-icons/Feather"


const ProfileUser = ({ route }) => {

    const { height } = Dimensions.get("screen");
    const dispatch = useDispatch();

    const { fullDataUserConnected } = useContext(ContextApp);

    const [posts, setPosts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState();
    const [isFollow, setIsFollow] = useState(false);

    const compte = useSelector(state => state.comptes.value);

    const navigation = useNavigation();
    const userProfile = route && route.params && route.params.user;

    const urlShare = `https://www.onyobt.com/@${user && user.pseudo}`

    const getOneUser = async (itemUser) => {
        try {
            const { data } = await axios.get(`${baseUrl}/users/${itemUser && itemUser._id}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOneUser(userProfile);
    }, [userProfile]);

    const onShare = async () => {
        try {
            await Share.share({ message: urlShare });
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllPosts = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/posts`);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const followUser = async () => {
        try {
            await
                axios.patch(`${baseUrl}/users/follow/${fullDataUserConnected && fullDataUserConnected._id}`, {
                    idToFollow: user && user._id
                });
            getOneUser(userProfile)
        } catch (error) {
            console.log(error);
        }
    };

    const unFollowUser = async () => {
        try {
            await
                axios.patch(`${baseUrl}/users/unFollowUser/${fullDataUserConnected && fullDataUserConnected._id}`, {
                    idToUnfollow: user && user._id
                });
            console.log("kkkk")
            getOneUser(userProfile)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, [userProfile, user]);

    useEffect(() => {
        const videosUser = posts && posts.filter(val => val && user && val.posterId === user._id);
        setVideos(videosUser);
    }, [posts]);

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
        userA.id = item && item.posterId && item.posterId;
        userA.idPost = item && item._id;
        if (compte && compte.solde > 0.002) {
            if (user && user._id !== item.posterId) {
                dispatch(addSoldeCompte(userA));
            }
        }
    }

    const views = [];

    const handleCountNumberViews = (item) => {
        let form = {}
        form.postId = item && item._id;
        form.id = fullDataUserConnected && fullDataUserConnected._id;
        views.push(item.posterId)
        if (compte && compte.solde > 0.002) {
            dispatch(viewPost(form));
        }
    };

    useEffect(() => {
        const isFollowUser = user && user.followers && user.followers.includes(fullDataUserConnected && fullDataUserConnected._id)
        setIsFollow(isFollowUser)
    }, [user]);

    const urlImage = user && user.url;

    return (
        <View style={styles.container}>
            <View style={styles.contentMain}>
                <TouchableOpacity onPress={() => navigation.navigate('videos')}>
                    <AntDesign name='arrowleft' style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.textContentMain}>{user && user.pseudo}</Text>

                <TouchableOpacity onPress={() => onShare()}>
                    <Entypo name='share' style={styles.icons} />
                </TouchableOpacity>
            </View>

            <View style={styles.deuxiemeContentMain}>
                <Avatar label={user && user.pseudo && user.pseudo} size={100} color='#fff'
                    style={styles.avatar}
                    image={{ uri: baseUrlFile + "/" + urlImage }} />
                <Text style={styles.textDeuxiemeContent}>@{user && user.pseudo}</Text>
            </View>

            <View style={styles.troisiemeContentMain}>
                <TouchableOpacity style={styles.contentEnfantTroisieme}>
                    <Text style={styles.textTroisiemeContent}>
                        {user && user.following && user.following.length}
                    </Text>
                    <Text style={styles.textDeuxTroisieme}>Suivis</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.contentEnfantTroisieme}
                    onPress={() => navigation.navigate('listFollowers', { user: user })}
                >
                    <Text style={styles.textTroisiemeContent}>
                        {user && user.followers && user.followers.length}
                    </Text>
                    <Text style={styles.textDeuxTroisieme}>Followers</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contentEnfantTroisieme}>
                    <Text style={styles.textTroisiemeContent}>10M</Text>
                    <Text style={styles.textDeuxTroisieme}>J'aime</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentQuatrieme}>

                {
                    user && fullDataUserConnected && user._id !== fullDataUserConnected._id ?
                        <TouchableOpacity
                            style={{ padding: 10, width: "50%", backgroundColor: 'crimson', borderRadius: 5 }}
                            onPress={() => isFollow ? unFollowUser() : followUser()}
                        >
                            <Text style={{
                                textAlign: "center", color: "#fff", fontSize: 17
                            }}>
                                {
                                    isFollow ? "Ne plus suivre" : "Suivre"
                                }
                            </Text>
                        </TouchableOpacity> : ""
                }

            </View>

            <View style={styles.contentQuatrieme}>
                <Text style={{
                    textAlign: "center", color: "#000", fontSize: 15
                }}>Jeune entrepreneur congolais.</Text>
            </View>

            <View style={styles.contentPubs}>
                <Text style={{ color: "#000", fontSize: 17 }}>Publications ({videos && videos.length})</Text>
                <FlatList
                    style={{
                        marginTop: 10,
                        width: "100%"
                    }}
                    data={videos}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return <TouchableOpacity
                            onPress={() => {
                                viewPlayerVideo(item)
                                addSolde(item)
                                handleCountNumberViews(item)
                            }}
                            style={{
                                flexGrow: 1,
                                height: height / 6,
                                padding: 4,
                                position: "relative",
                                backgroundColor: '#000'
                            }} key={item.id}>

                            <Video
                                style={styles.videoP}
                                source={{ uri: item && baseUrlFile + "/" + item.video }}
                                controls={false}
                                muted={true}
                            />
                            <View style={{
                                fontSize: 15,
                                position: "relative",
                                bottom: 20,
                                right: 0,
                                backgroundColor: "#000",
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Feather name='play' color="#fff" size={10} />
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>  {item && item.views && item.views.length}  </Text>
                            </View>
                        </TouchableOpacity>
                    }}
                    keyExtractor={(item) => item && item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    contentMain: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    icons: {
        fontSize: 25,
        color: '#222'
    },
    textContentMain: {
        fontSize: 20,
        color: '#222'
    },
    deuxiemeContentMain: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    avatar: {
        marginTop: 10,
        backgroundColor: '#ddd'
    },
    textDeuxiemeContent: {
        fontSize: 15,
        color: '#333',
        marginTop: 10
    },
    troisiemeContentMain: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        alignItems: "center",
        gap: 50
    },
    contentEnfantTroisieme: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textTroisiemeContent: {
        color: "#000",
        fontSize: 17,
        fontWeight: "bold"
    },
    textDeuxTroisieme: {
        color: '#444',
        fontSize: 12
    },
    contentQuatrieme: {
        width: "100%",
        marginTop: 15,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    contentPubs: {
        marginTop: 20
    },
    containerGrille: {
    },
    videoP: {
        alignSelf: "stretch",
        height: "100%",
    },
})

export default ProfileUser