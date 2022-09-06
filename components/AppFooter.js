import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../utility/globalStyles";

export default function AppFooter() {
    return <View style={styles.container}>
        <Text style={globalStyles.textCenter}>Copyright &copy; 2019 Elite Managment LLC.</Text>
        <Text style={globalStyles.textCenter}>Alrights reserved.</Text>
    </View>

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        padding:5,
        backgroundColor: '#ffffff'
    }
});