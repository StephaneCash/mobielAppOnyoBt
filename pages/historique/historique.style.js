import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: (HEIGHT) => (
        {
            height: "100%",
            width: '100%',
            padding: 10,
            backgroundColor: "#ddd",
            flexDirection: "column",
            justifyContent: "space-between",
        }
    ),
    speaker: (clic) => ({
        backgroundColor: clic ? "#006abd" : "transparent",
        width: 40,
        height: 40,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }),
    headTwo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    bloc1: {
        width: "100%",
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headMain: {
        flexDirection: "column",
        gap:10,
        paddingVertical: 10,
        backgroundColor: "#006abd",
        paddingHorizontal: 10,
    },
    headIcons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#006abd",
        gap: 10
    },
    titleHead: {
        color: "#fff",
        fontWeight: 500,
        fontSize: 17
    },
    containerTitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    nomUserAndDurationText: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        gap: 8
    },
    textNom: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold"
    },
    duree: {
        color: "#555",
        fontSize: 15
    },
    avatarContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomCall: {
        flexDirection: "row",
        backgroundColor: "#eee",
        padding: 30,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10
    },
    btnStopCall:
    {
        padding: 5,
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    usersListContainer: {
        padding: 10,
    },
});