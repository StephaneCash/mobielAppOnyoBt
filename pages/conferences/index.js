import {
    FlatList, View, PermissionsAndroid,
    StyleSheet,
    Text,
    TextInput, Platform,
    SafeAreaView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Contacts from 'react-native-contacts';
import Contact from './Contact';
import Loader from '../videos/Loader';

const Conferences = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getDataContacts = () => {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    "title": "Contacts",
                    "message": "This app would like to view your contacts",
                    'buttonPositive': "Autoriser"
                }
            ).then(() => {
                getData()
            })
                .catch(e => {
                    console.log(e)
                })

        }
        getDataContacts()
    }, []);

    function getData() {
        Contacts.getAll()
            .then(res => {
                console.log(res)
                setContacts(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const search = (text) => {
        const phoneNumberRegex =
            /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        if (text === '' || text === null) {
            getData()
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text).then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
                console.log('contacts', contacts);
            });
        } else {
            Contacts.getContactsMatchingString(text).then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
                console.log('contacts', contacts);
            });
        }
    };

    const openContact = (contact) => {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Liste contacts ONYO-BT
                </Text>
                <TextInput
                    onChangeText={search}
                    placeholder="Rechercher un contact..."
                    placeholderTextColor="#000"
                    style={styles.searchBar}
                />
                {
                    contacts ?
                        <FlatList
                            data={contacts}
                            renderItem={(contact) => {
                                {
                                    console.log('contact -> ' + JSON.stringify(contact));
                                }
                                return (
                                    <Contact
                                        key={contact.item.recordID}
                                        item={contact.item}
                                        onPress={openContact}
                                    />
                                );
                            }}
                            keyExtractor={(item) => item.recordID}
                        />
                        : <Loader />
                }

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#4591ed',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontSize: 20,
        fontWeight: 700
    },
    searchBar: {
        backgroundColor: '#fff',
        color: "#000",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 30,
        paddingVertical: Platform.OS === 'android' ? undefined : 15,
    },
});
export default Conferences