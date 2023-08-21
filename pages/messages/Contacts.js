import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../bases/basesUrl';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/Entypo';

const Contacts = ({ item }) => {

    const navigation = useNavigation();
    const urlImage = item && item.url;

    return (
        <Pressable
            onPress={() => navigation.navigate('chat', {
                recepientId: item._id
            })}
            style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                borderBottomColor: "#D0D0D0",
                padding: 10,
                height: 140
            }}>
            <Avatar style={{ backgroundColor: "#eee" }}
                tintColor='#fff' icon={<FontAwesome name='user'
                    color={"silver"} size={28} />}
                size={50} color='#fff'
                image={{ uri: baseUrlFile + "/" + urlImage }} />
            <View>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "#222" }}>
                    {
                        item && item.pseudo && item.pseudo.length > 10 ?
                            item && item.pseudo && item.pseudo.substring(0, 10) + "..." :
                            item && item.pseudo
                    }
                </Text>
            </View>
        </Pressable>
    )
}

export default Contacts