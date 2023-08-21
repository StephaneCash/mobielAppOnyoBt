import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { Avatar } from "@react-native-material/core";
import { baseUrlFile } from '../../bases/basesUrl';

const getAvatarInitials = (textString) => {

    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
        textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
};

const Contact = (props) => {

    const { item, onPress } = props;

    const user = item && item && item.item;
    const urlImage = user && user.url;

    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View style={styles.itemContainer}>
                <View style={styles.leftElementContainer}>
                    <Avatar style={{ backgroundColor: "#ddd", }} tintColor='#fff' icon={<FontAwesome name='user' color={"silver"} size={28} />}
                        size={50} color='#fff'
                        image={{ uri: baseUrlFile + "/" + urlImage }} />
                </View>
                <View style={styles.rightSectionContainer}>
                    <View style={styles.mainTitleContainer}>
                        <Text
                            style={
                                styles.titleStyle
                            }>{`${user && user.nom}`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        minHeight: 44,
        height: 63,
    },
    leftElementContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        paddingLeft: 13,
    },
    rightSectionContainer: {
        marginLeft: 18,
        flexDirection: 'row',
        flex: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'silver',
    },
    mainTitleContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    titleStyle: {
        fontSize: 16,
        color: '#555'
    },
});

export default memo(Contact);

Contact.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
};