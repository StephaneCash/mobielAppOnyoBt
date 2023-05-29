import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Contacts from 'react-native-contacts';
import Contact from './Contact';

const Conferences = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function get() {
            try {
                let res = await Contacts.getAll();
                console.log(res, " CONTACTS")
            } catch (error) {
                console.log(error, " Erreur")
            }
        }

        get()
    }, []);

    console.log()


    return (
        <View>

            {/* <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
        /> */}
        </View>

    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});

export default Conferences