import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../utility/globalStyles";

export default function AppFooter() {
    return <View style={styles.container}>
        <Text style={[globalStyles.textCenter, {marginBottom: 10, color: '#253053'}]}>Copyright &copy; 2024 Precision Material Management.</Text>
        {/* <Text style={globalStyles.textCenter}>All rights reserved.</Text> */}
    </View>

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        padding:7,
        backgroundColor: '#E2EFFF'
    }
});