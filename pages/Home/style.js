import { StyleSheet } from "react-native";
import { COLORS, PADDING } from "../../outils/constantes";

const dashboardStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        backgroundColor: "#006abd",
        elevation: 2,
        shadowColor: '#000'
    },
    userImg: {
        width: 30,
        height: 30,
        borderRadius: 50 / 2
    },
    userName: {
        fontSize: 16,
        fontWeight: "900",
        color: '#fff'
    },
    scrollabelList: {
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
    },
    videosComment: {
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
    },
    videoTitle: {
        fontWeight: "bold",
        fontSize: 16
    },
    spaceBettwen: {
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    link: {
        color: "#0e6bf7",
        fontWeight: "bold",
        fontSize: 16
    },
    transactionContainer: {
        paddingHorizontal: PADDING.horizontal,
        paddingVertical: PADDING.vertical,
    }
})

export default dashboardStyles;