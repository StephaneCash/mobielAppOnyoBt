import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSelector } from "react-redux"
import { dateParserFunction } from '../../outils/constantes';
import { ContextApp } from '../../context/AuthContext';

const ListTransactions = () => {

    const data = useSelector(state => state.transactions.value);
    const { fullDataUserConnected } = useContext(ContextApp);

    return (
        <FlatList
            style={styles.flatList}
            data={data}
            renderItem={({ item }) => {
                if (item && fullDataUserConnected && item.userId === fullDataUserConnected._id)
                    return <View style={styles.postView} key={item && item._id}>
                        <Text style={{ color: "#666", fontSize: 16}}>
                            Vous avez rechargé
                            <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}> {
                                item && item.montant
                            } OBT </Text> {dateParserFunction(item && item.createdAt)} et expire le 02 juillet 2023 
                        </Text>
                    </View>
            }}

            keyExtractor={(item) => item && item._id}
        />
    )
}

export default ListTransactions


const styles = StyleSheet.create({
    postView: {
        width: "100%",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginBottom: 10,
        paddingBottom: 10,
    },
    flatList: {
        height: "auto"
    }
})
