import { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";

import AppContainer from "../AppContainer";
import AppButton from "../components/AppButton";
import { globalStyles } from "../utility/globalStyles";
import TimeLoggerList from "../components/TimeLoggerList";
import { API_BASE_URL, TAB } from "../constants";
import { userData } from "../utility/utility";
import Toast from "react-native-root-toast";
import axios from "../api-client";

export default function TimeLoggingScreen({ navigation, route }) {
  const { optionState } = route.params;
  const { textCenter, heading, heading3 } = globalStyles
  const [state, setState] = useState({ tabIndex: 0, sheetResult: null });
  const [loading, setLoading] = useState(false)

  const switchTab = (tabIndex) => {
    tabIndex == TAB.LAST_WEEK ? getTimeSheet(tabIndex, getLastWeekDate()) : getTimeSheet(tabIndex)
  }

  function isActive(value) {
    return state.tabIndex == value
  }

  useEffect(() => {
    getUserData()
  }, [])

  const getLastWeekDate = () => {
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0);
    return `${lastWeek.getFullYear()}-${lastWeek.getMonth() + 1}-${lastWeek.getDate()}`
  }

  const getUserData = async () => {
    const user = await userData();
    getTimeSheet(TAB.CURRENT_WEEK, getLastWeekDate())
    setState({ ...state, user })
  }

  const getTimeSheet = (tabIndex = TAB.CURRENT_WEEK, WeekEnding = null) => {
    const { selectedCraft } = optionState;
    const employeeContractId = selectedCraft?.employeeContract
    setLoading(true);
    axios.get(`${API_BASE_URL}/Timesheet/GetTimeSheet?employeeContractId=${employeeContractId}&WeekEnding=${WeekEnding}`).then(({ data }) => {
      setState({ ...state, sheetResult: data.data, tabIndex })
      console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 49 ~ axios.get ~ data", data)
      setLoading(false);
    }, (errors) => {
      setLoading(false);
      console.log("🚀 ~ file: ChooseScreen.js ~ line 30 ~ axios.get ~ errors", errors)
      Toast.show('Something went wrong, please try again later', {
        position: Toast.positions.BOTTOM,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
    });
  }

  const onHourChange = (newSheet) => {
    setState({ ...state, sheetResult: { ...state.sheetResult, ...{ timesheetBreakdowns: newSheet } } })
  }

  const getTotalCost = () => {
    return state?.sheetResult?.timesheetBreakdowns && state?.sheetResult?.timesheetBreakdowns.reduce(function (prev, cur) {
      return prev + cur.totalCost;
    }, 0);
  }

  const getTotalHours = () => {
    const data = state?.sheetResult?.timesheetBreakdowns;
    return data && data.filter(({ totalHours }) => totalHours && totalHours).reduce(function (prev, cur) {
      return prev + cur.totalHours;
    }, 0);
  }

  const onSubmit = () => {
    setLoading(true);
    console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 104 ~ onSubmit ~ state.sheetResult", state.sheetResult)

    axios
      .put(`${API_BASE_URL}/Timesheet`, { ...state.sheetResult })
      .then(({ data }) => {
        // console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 87 ~ .then ~ data", data)
        setLoading(false);
        Toast.show('Sheet Updated Successfully', {
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: 'green'
        })
      }, (error) => {
        setLoading(false);
        console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 66 ~ .then ~ error", error)
        Toast.show('Something went wrong, please try again later', {
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      });
  };

  let totalSheetHours = { stHours: 0, otHours: 0, dtHours: 0 }
  Array.isArray(state.sheetResult?.timesheetBreakdowns) && state.sheetResult?.timesheetBreakdowns.forEach(({ dtHours, otHours, stHours }) => {
    totalSheetHours = { 
      ...totalSheetHours, 
      dtHours: totalSheetHours.dtHours + dtHours, 
      stHours: totalSheetHours.stHours + stHours, 
      otHours: totalSheetHours.otHours + otHours, 
    }
  })

  return (
    <AppContainer>
      <ScrollView>
        <View style={styles.formWrapper}>
          <Text style={[textCenter]}>Hours Logged This Period:</Text>
          <Text style={[heading, textCenter]}>{getTotalHours()} Hours</Text>
          <View style={styles.cell}>
            <Text style={styles.cellTime}>ST: <Text style={styles.bold}>{totalSheetHours?.stHours}</Text></Text>
            <Text style={styles.cellTime}>OT: <Text style={styles.bold}>{totalSheetHours?.otHours}</Text></Text>
            <Text style={styles.cellTime}>DT: <Text style={styles.bold}>{totalSheetHours?.dtHours}</Text></Text>
          </View>
          {/* <Text style={[heading3, textCenter]}>Total cost: {getTotalCost()}</Text> */}
          <View style={styles.loggerWrapper}>
            <View style={styles.tabsWrapper}>
              <TouchableHighlight style={[styles.tabItem, isActive(TAB.CURRENT_WEEK) && styles.tabActive]} onPress={() => switchTab(0)}><Text style={[styles.tabText, isActive(TAB.CURRENT_WEEK) && styles.tabActive]}>This Week</Text></TouchableHighlight>
              {/* <TouchableHighlight style={[styles.tabItem, isActive(TAB.LAST_WEEK) && styles.tabActive]} onPress={() => switchTab(1)}><Text style={[styles.tabText, isActive(TAB.LAST_WEEK) && styles.tabActive]}>Last Week</Text></TouchableHighlight> */}
            </View>
            {state?.sheetResult && <View>
              <TimeLoggerList data={state.sheetResult} onHourChange={onHourChange} />
            </View>}
          </View>
          {loading && <ActivityIndicator size={'large'} color="white" style={globalStyles.loading} />}
          <AppButton disabled={loading} style={[styles.button, loading && globalStyles.btnDisabled]} onPress={() => onSubmit()} label={'SAVE'} />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const tabColor = '#007bff'; //'#dc3545'
const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    // marginVertical: 50,
    marginBottom: 70
  },
  loggerWrapper: {
    // padding: 20
  },
  button: {
    width: 250,
    alignSelf: 'center',
  },
  tabsWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: tabColor
  },
  tabItem: {
    // width: "50%",
    width: "100%",
    backgroundColor: '#fff',
    padding: 10,
    borderColor: tabColor,
    borderWidth: 2
  },
  tabActive: {
    backgroundColor: tabColor,
    color: 'white'
  },
  tabText: {
    fontSize: 16,
    fontweight: '800',
    textAlign: 'center'
  },
  cell: {
    margin: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellTime: {
    marginHorizontal: 3,
    color: '#666',
    width: 45
  },
  bold: {
    fontweight: 'bold',
    color: '#000',
    fontSize: 16
  }
})
