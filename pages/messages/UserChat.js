import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/Entypo';

const UserChat = ({ item }) => {

    const navigation = useNavigation();
    const urlImage = item && item.url;

    return (
        <Pressable
            onPress={() => navigation.navigate('chat', {
                recepientId: item._id
            })}
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderBottomColor: "#D0D0D0",
                padding: 10,
            }}>
            <Avatar style={{ backgroundColor: "#eee" }} tintColor='#fff' icon={<FontAwesome name='user' color={"silver"} size={28} />}
                size={50} color='#fff'
                image={{ uri: baseUrlFile + "/" + urlImage }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "#222" }}>{item?.pseudo}</Text>
                <Text style={{ marginTop: 3, color: "gray" }}>Derniers messages</Text>
            </View>

            <View>
                <Text style={{ color: "#585858", fontWeight: "400", fontSize: 11 }}>3:00 pm</Text>
            </View>
        </Pressable>
    )
}

export default UserChat