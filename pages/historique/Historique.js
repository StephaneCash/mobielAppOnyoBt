import { View, Text } from 'react-native'
import React from 'react'
import historiqueStyle from './historique.style'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Historique = () => {
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
        </View>
    )
}

export default Historique