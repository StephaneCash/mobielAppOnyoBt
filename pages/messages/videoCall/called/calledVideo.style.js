import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: (HEIGHT) => (
        {
            height: "100%",
            width: '100%',
            padding: 10,
            backgroundColor: "#fff",
            flexDirection: "column",
            justifyContent: "space-between",
        }
    ),
    iconCallHead: {
        backgroundColor: "#006abd",
        width: 30,
        height: 30,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textAppel: {
        color: "#333",
        fontWeight: "600"
    },
    textAppelEntrant: {
        marginTop: 5,
        color: "#333",
        fontWeight: "600",
    },
    bloc1: {
        width: "100%",
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        justifyContent: "space-between"
    },
    containerName: {
        paddingHorizontal: 15,
        paddingTop: 10
    },
    titleHead: {
        color: "#333",
        fontWeight: 500
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
        borderRadius: 10,
        backgroundColor: "#ddd"
    },
    btnStopCall:
    {
        padding: 5,
        width: 60,
        height: 60,
        backgroundColor: "red",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btnStopCall2:
    {
        padding: 5,
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btnAcceptpCall: {
        padding: 5,
        width: 60,
        height: 60,
        backgroundColor: "green",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    usersListContainer: {
        padding: 10,
    },
    speaker: (clic) => ({
        backgroundColor: clic ? "#006abd" : "transparent",
        width: 40,
        height: 40,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }),
});