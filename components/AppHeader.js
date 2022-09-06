import { Image, StyleSheet, Text, View } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { APP_LOGO } from "../constants";
import { globalStyles } from "../utility/globalStyles";

export default function AppHeader() {
    return <>
        <View style={styles.container}>
            <Image style={styles.logoImage} source={APP_LOGO} alt="logo" />
            <Text style={[styles.logoText, globalStyles.textShadow]}>LITE</Text>
        </View>
        <Text style={[styles.logoHeading, globalStyles.textShadow]}>PROJECT MANAGMENT</Text>
    </>

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: getStatusBarHeight() + 20
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        fontSize: 60,
        marginLeft: 10,
    },
    logoHeading: {
        fontSize: 30,
        marginTop: 10,
    },
})