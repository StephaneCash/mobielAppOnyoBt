import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import historiqueStyle from './historique.style'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../bases/basesUrl';
import Call from './Call';
import { useNavigation } from '@react-navigation/native';
import { ContextApp } from '../../context/AuthContext';

const Historique = ({ route }) => {

    const data = route && route.params && route.params.data;
    const navigation = useNavigation();

    const { fullDataUserConnected, socket } = useContext(ContextApp);
    const userIdConnected = fullDataUserConnected && fullDataUserConnected._id;

    const [call, setCall] = useState(false);

    const formatTime = (time) => {
        let options = {
            hour: "2-digit", minute: "2-digit",
            weekday: "long", year: "numeric", month: "short", day: "numeric"
        };

        let timestamp = Date.parse(time);
        let dateParse = new Date(timestamp).toLocaleDateString('fr-FR', options);

        const dateSplit = dateParse.toString()
        return dateSplit
    };

    return (
        <View style={historiqueStyle.container}>
            <View style={historiqueStyle.headMain}>
                <View style={historiqueStyle.head}>
                    <Text style={historiqueStyle.titleHead}>ONYO-BT</Text>

                    <View style={historiqueStyle.headIcons}>
                        <FontAwesome name='search' size={20} color={"#fff"} />
                        <Feather name='more-vertical' size={20} color={"#fff"} />
                    </View>
                </View>

                <View style={historiqueStyle.headTwo}>
                    <Text style={historiqueStyle.titleHead}>Historiques Appels</Text>
                    <FontAwesome name='history' size={20} color={"#fff"} />
                </View>
            </View>
            <ScrollView>
                <View style={historiqueStyle.containerItem}>
                    {
                        data && data.length > 0 &&
                        data.map(val => {

                            const imageUrl = val && val.callerId && val.callerId.url;
                            const caller = val && val.callerId;
                            const status = val && val.status;
                            const called = val && val.calledId;

                            return <View key={val._id} style={historiqueStyle.itemUser}>
                                <View style={historiqueStyle.avatarAndText}>
                                    <Avatar style={{ backgroundColor: "#eee", borderColor: "#ddd", borderWidth: 1 }}
                                        tintColor='#fff' icon={<FontAwesome name='user' color={"silver"} size={28} />}
                                        size={50} color='#fff'
                                        image={{ uri: baseUrlFile + "/" + imageUrl }} />

                                    <View style={{ flexDirection: "column", gap: 1 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "500", color: status === 1 ? "green" : "crimson" }}>
                                            {called ? called.pseudo : caller.pseudo}
                                        </Text>
                                        <Text style={{ fontSize: 10, fontWeight: "500", color: status === 1 ? "green" : "crimson" }}>
                                            {val.duree}
                                        </Text>

                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                            <Text>
                                                {
                                                    val && val.calledId === userIdConnected ?
                                                        val && val.type === 1 ?
                                                            <SimpleLineIcons name='call-out'
                                                                size={15} color={status === 1 ? "green" : "crimson"} /> : val.type === 0 ?
                                                                <SimpleLineIcons name='call-in' size={15}
                                                                    color={status === 1 ? "green" : "crimson"} /> : "" :
                                                        val && val.type === 0 ?
                                                            <SimpleLineIcons name='call-out'
                                                                size={15} color={status === 1 ? "green" : "crimson"} /> : val.type === 0 ?
                                                                <SimpleLineIcons name='call-in' size={15}
                                                                    color={status === 1 ? "green" : "crimson"} /> : ""
                                                }
                                            </Text>

                                            <Text style={{ marginTop: 3, color: "gray" }}>
                                                {formatTime(val && val.createdAt)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    {
                                        call ?
                                            <Call
                                                FontAwesome={FontAwesome}
                                                navigation={navigation}
                                                socket={socket}
                                                fullDataUserConnected={fullDataUserConnected}
                                                receiveData={val && val.calledId}
                                            /> :
                                            <TouchableOpacity
                                                onPress={() => setCall(true)}
                                            >
                                                <FontAwesome name='phone' size={25} color={"green"} />
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Historique