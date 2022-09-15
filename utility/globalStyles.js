import { StyleSheet } from "react-native";
const primaryColor = '#2B3CFF';
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
    },
    btnText: {
        fontSize: 20,
        color: lightColor,
        textAlign: "center",
    },
    heading: {
        fontSize: 40,
        marginTop: 10,
        fontWeight: "300"
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4
    },
    btnDisabled:{
        opacity: 0.5
    },
    textDisabled:{
        color: darkColor
    },
    mt1:{
        marginTop: 10
    },
    mt2:{
        marginTop: 20
    },
    mt3:{
        marginTop: 30
    },
    mb1:{
        marginBottom: 10
    },
    mb2:{
        marginBottom: 20
    }
});