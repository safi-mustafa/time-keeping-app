import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TimeLoggerList({ data = [], onHourChange }) {

    // const [state, setState] = useState(data);
    const onChangeText = (value, id) => {
        const newState = data.map(item => {
            return item.id == id ? { ...item, totalHours: value ? parseInt(value) : '' } : item
        })
        // setState(newState);
        onHourChange(newState);
        // console.log("🚀 ~ file: TimeLoggerList.js ~ line 9 ~ onChangeText ~ value", value)
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().slice(0, 10);
    }

    return <>
        <View style={styles.container}>
            {data.map(({ id, day, date, totalHours }) => <View key={id} style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>{day} {formatDate(date)}</Text>
                </View>
                <View style={styles.cell}>
                    <TextInput onChangeText={(value) => onChangeText(value, id)} name={id} keyboardType='numeric' value={totalHours.toString()} style={[styles.cellInput, styles.cellText]} />
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