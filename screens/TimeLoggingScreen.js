import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';

import AppContainer from "../AppContainer";
import AppButton from "../components/AppButton";
import { globalStyles } from "../utility/globalStyles";
import TimeLoggerList from "../components/TimeLoggerList";
import { TAB } from "../constants";
import { currentWeekData, lastWeekData } from "../assets/values/options";

export default function TimeLoggingScreen({ navigation }) {

  const [state, setState] = useState(0)
  const onSubmit = (values) => {
    navigation.navigate('Login')
  };

  const { textCenter, heading } = globalStyles

  const switchTab = (value) => {
    setState(value)
  }

  function isActive(value) {
    return state == value
  }

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
            <ScrollView style={{ maxHeight: 250 }}>
              {TAB.CURRENT_WEEK == state ? <TimeLoggerList data={currentWeekData} /> : <TimeLoggerList data={lastWeekData} />}
            </ScrollView>
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
