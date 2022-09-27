import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "../api-client";
import { API_BASE_URL } from "../constants";

export default function TimeLoggerList({ data = [], onHourChange }) {

    const [state, setState] = useState(data);

    useEffect(() => {
        // console.log("🚀 ~ file: TimeLoggerList.js ~ line 13 ~ useEffect ~ data", data)
        setState(data)
        return () => {
            setState([])
        }
    }, [data])


    const onChangeText = (value, selectedItem) => {
        // let currentDayItem = {};
        const newState = state.map(item => {
            return item.id == selectedItem?.id ? { ...item, totalHours: value ? parseInt(value) : '' } : item
        })
        onHourChange(newState);
        getOtherHours(value, selectedItem);
    }

    const setWorkingHours = (id, { totalHours, totalCost, dtHours, otHours, stHours }) => {
        const newState = state.map(item => {
            return item.id == id ? { ...item, totalHours, totalCost, dtHours, otHours, stHours } : item
        })
        onHourChange(newState)
    }

    const getOtherHours = (hours, { id, day, stRate, otRate, dtRate }) => {
        const params = `hours=${hours}&day=${day}&stRate=${stRate}&otRate=${otRate}&dtRate=${dtRate}`
        // if (!hours)
        //     return
        axios.get(`${API_BASE_URL}/Timesheet/GetHoursBreakdown?${params}`).then(({ data }) => {
            setWorkingHours(id, data?.data)
        }, (errors) => {
            console.log("🚀 ~ file: TimeLoggerList.js ~ line 23 ~ axios.get ~ errors", errors)
        })
    }

    const formatDate = (date) => {
        let formattedDate = new Date(date).toISOString().slice(0, 10);
        formattedDate = formattedDate.split('-');
        return `${formattedDate[1]}-${formattedDate[2]}-${formattedDate[0]}`
    }

    return <>
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                {state.map(({ id, day, date, totalHours, dtHours, otHours, stHours, ...otherItem }) => <View key={id} style={styles.row}>
                    <View style={styles.dateCell}>
                        <Text style={styles.cellText}>{day} {formatDate(date)}</Text>
                    </View>
                    <View style={styles.cell}>
                        <TextInput onChangeText={(value) => onChangeText(value, { id, day, ...otherItem })} name={id} keyboardType='numeric' value={totalHours ? totalHours.toString() : ''} style={[styles.cellInput, styles.cellText]} />
                        <Text style={styles.cellTime}>ST: <Text style={styles.bold}>{stHours}</Text></Text>
                        <Text style={styles.cellTime}>OT: <Text style={styles.bold}>{otHours}</Text></Text>
                        <Text style={styles.cellTime}>DT: <Text style={styles.bold}>{dtHours}</Text></Text>
                    </View>
                </View>)}
            </View>
        </KeyboardAwareScrollView>
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
    dateCell: {
        width: '45%',
        fontSize: 13,
    },
    cell: {
        width: '55%',
        fontSize: 13,
        paddingLeft: 10,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 16
    },
    cellInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 2,
        minWidth: 45,
        marginRight: 5,
        height: 35,
        textAlign: 'center'
    },
    cellTime: {
        marginHorizontal: 3,
        color: '#666',
        width: 45
    },
    bold: {
        fontweight: 'bold',
        color: '#000'
    }
})