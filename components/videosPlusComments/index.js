import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import IMG1 from "../../images/img1.png";
import IMG2 from "../../images/img2.png";
import IMG3 from "../../images/img3.png";
import Styles from './style';

const VideoPlus = ({ item }) => {
    return (
        <TouchableOpacity style={Styles.scrollabelItem}>
            <View style={Styles.item}>
                <Image
                    style={Styles.itemImage}
                    source={
                        item.id === 1 ? require(`../../images/img1.png`) :
                            item.id === 2 ? require(`../../images/img2.png`) :
                                item.id === 3 ? require(`../../images/img3.png`) : ""
                    } />
                <Text>{item.libelle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default VideoPlus