import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";

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
  const { textCenter, heading } = globalStyles
  const [state, setState] = useState({ tabIndex: 0, sheetResult: null });

  const switchTab = (value) => {
    setState({ ...state, tabIndex: value })
  }

  function isActive(value) {
    return state.tabIndex == value
  }

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const user = await userData();
    getTimeSheet(user?.userDetail?.id)
    setState({ ...state, user })
  }

  const getTimeSheet = (employeeId) => {
    const { selectedProject, selectedCraft } = optionState;
    const projectId = selectedProject?.project?.id
    const craftId = selectedCraft?.value

    axios.get(`${API_BASE_URL}/Timesheet/GetTimeSheet?employeeId=${employeeId}&ProjectId=${projectId}&CraftId=${craftId}`).then(({ data }) => {
      console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 47 ~ axios.get ~ data", data)
      setState({ ...state, sheetResult: data.data })
    }, (errors) => {
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

  const onSubmit = () => {
    console.log(`${API_BASE_URL}/Timesheet`);
    axios
      .put(`${API_BASE_URL}/Timesheet`, { ...state.sheetResult })
      .then(({ data }) => {
        Toast.show('Sheet Updated Successfully', {
          position: Toast.positions.TOP,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: 'green'
        })
      }, (error) => {
        console.log("🚀 ~ file: TimeLoggingScreen.js ~ line 66 ~ .then ~ error", error)
        Toast.show('Something went wrong, please try again later', {
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          delay: 0,
        })
      });
  };

  return (
    <AppContainer>
      <ScrollView>
        <View style={styles.formWrapper}>
          <Text style={[textCenter]}>Time Logged This Week:</Text>
          <Text style={[heading, textCenter]}>36 Hours</Text>
          <View style={styles.loggerWrapper}>
            <View style={styles.tabsWrapper}>
              <TouchableHighlight style={[styles.tabItem, isActive(TAB.CURRENT_WEEK) && styles.tabActive]} onPress={() => switchTab(0)}><Text style={[styles.tabText, isActive(TAB.CURRENT_WEEK) && styles.tabActive]}>This Week</Text></TouchableHighlight>
              <TouchableHighlight style={[styles.tabItem, isActive(TAB.LAST_WEEK) && styles.tabActive]} onPress={() => switchTab(1)}><Text style={[styles.tabText, isActive(TAB.LAST_WEEK) && styles.tabActive]}>Last Week</Text></TouchableHighlight>
            </View>
            {state?.sheetResult && <ScrollView style={{ maxHeight: 250 }}>
              {TAB.CURRENT_WEEK == state.tabIndex ? <TimeLoggerList data={state.sheetResult?.timesheetBreakdowns} onHourChange={onHourChange} /> : <TimeLoggerList data={state.sheetResult?.timesheetBreakdowns} />}
            </ScrollView>}
          </View>
          <AppButton style={[styles.button]} onPress={() => onSubmit()} label={'SAVE'} />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    // marginVertical: 50,
    marginBottom: 100
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
    backgroundColor: 'red'
  },
  tabItem: {
    width: "50%",
    backgroundColor: '#fff',
    padding: 10,
    borderColor: 'red',
    borderWidth: 2
  },
  tabActive: {
    backgroundColor: 'red',
    color: 'white'
  },
  tabText: {
    fontSize: 16,
    fontweight: '800',
    textAlign: 'center'
  }
})
