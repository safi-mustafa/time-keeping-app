import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../utility/globalStyles";

export default function AppFooter() {
    return <View style={styles.container}>
        <Text style={globalStyles.textCenter}>Copyright &copy; 2019 Elite Managment LLC.</Text>
        <Text style={globalStyles.textCenter}>All rights reserved.</Text>
    </View>

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        padding:5,
        backgroundColor: '#eeeeee'
    }
});