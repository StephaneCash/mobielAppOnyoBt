import { StyleSheet } from "react-native";
import { PADDING } from "../../outils/constantes";

const Styles = StyleSheet.create({
    item: {
        marginRight: 15,
        flexDirection: "row",
        backgroundColor: 'fff',
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        alignItems: "center",
        borderRadius: 6
    },
    itemImage: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    scrollabelItem: {
        flexDirection: "column",
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        marginRight: 15,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 5,
        marginBottom: 5,
        width: 200
    },
})

export default Styles;