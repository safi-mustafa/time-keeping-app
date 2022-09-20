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
        {/* <Text style={[styles.logoHeading, globalStyles.textShadow]}>PROJECT MANAGMENT</Text> */}
    </>

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: getStatusBarHeight() - 20
    },
    logoImage: {
        width: 70,
        height: 60,
    },
    logoText: {
        fontSize: 50,
        marginLeft: 10,
    },
    logoHeading: {
        fontSize: 30,
    },
})