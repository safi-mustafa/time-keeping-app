import { StyleSheet } from "react-native";
const primaryColor = '#4a53d2';
const lightColor = '#FFFFFF';
const darkColor = '#999999';
export const globalStyles = StyleSheet.create({
    textCenter: {
        textAlign: "center",
    },
    textLight: {
        color: lightColor,
    },
    btnPrimary: {
        backgroundColor: primaryColor,
        padding: 15,
        textAlign: "center",
        color: '#fff',
        borderRadius: 5,
    },
    btnText: {
        fontSize: 20,
        color: lightColor,
        textAlign: "center",
    },
    heading: {
        fontSize: 36,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "300"
    },
    heading2: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: "300"
    },
    heading3: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: "300"
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4
    },
    btnDisabled: {
        opacity: 0.5
    },
    textDisabled: {
        color: '#eeeeee'
    },
    mt1: {
        marginTop: 10
    },
    mt2: {
        marginTop: 20
    },
    mt3: {
        marginTop: 30
    },
    mb1: {
        marginBottom: 10
    },
    mb2: {
        marginBottom: 20
    },
    loading: {
        position: 'absolute',
        top: '50%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 30,
        borderRadius: 12,
    }
});