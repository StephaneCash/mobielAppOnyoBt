import { StyleSheet } from "react-native";
import { PADDING } from "../../outils/constantes";

const Styles = StyleSheet.create({
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
    mainText: {
        marginTop: 10,
        fontSize: 16
    },
    numText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Styles;