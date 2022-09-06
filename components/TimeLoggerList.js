import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { globalStyles } from "../utility/globalStyles";

export default function TimeLoggerList({ data = [] }) {
    return <>
        <View style={styles.container}>
            {data.map(({ day, date, time }, index) => <View key={index} style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>{day} {date}</Text>
                </View>
                <View style={styles.cell}>
                    <TextInput value={time} style={[styles.cellInput, styles.cellText]} />
                </View>
            </View>)}
        </View>
    </>

}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: "center",
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
        padding: 10
    },
    cell: {
        width: '50%',
        fontSize: 14,
        justifyContent: 'center',
    },
    cellText: {
        fontSize: 16
    },
    cellInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5
    }
})