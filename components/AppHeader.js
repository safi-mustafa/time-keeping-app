import { Image, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { APP_LOGO } from "../constants";
import { globalStyles } from "../utility/globalStyles";

export default function AppHeader() {
    return <>
        <View style={styles.container}>
            <View style={styles.imageWrapper}><Image style={styles.logoImage} source={APP_LOGO} alt="logo" /></View>
            {/* <Text style={[styles.logoText, globalStyles.textShadow]}>Employee Timekeeping</Text> */}
        </View>
        {/* <Text style={[styles.logoHeading, globalStyles.textShadow]}>PROJECT MANAGMENT</Text> */}
    </>

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: getStatusBarHeight()
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    logoText: {
        fontSize: 30,
        marginLeft: 10,
        width: "60%",
        // backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    logoHeading: {
        fontSize: 30,
    },
    imageWrapper: {
        width: "100%",
        alignItems: "center",
    }
})