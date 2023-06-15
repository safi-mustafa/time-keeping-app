import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';

import AppContainer from "../AppContainer";
import AppButton from "../components/AppButton";
import { globalStyles } from "../utility/globalStyles";
import { API_BASE_URL } from "../constants";
import axios from "../api-client";

export default function ChooseScreen({ navigation }) {
  const [state, setState] = useState({ selectedCraft: null, selectedProject: null });
  const [resetCraft, setResetCraft] = useState(null)
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    getProjects()
    setState({ ...state, user })
  }

  const getProjects = () => {
    axios.get(`${API_BASE_URL}/Timesheet/GetProjects`).then(({ data }) => {
      setState({ ...state, projects: data.data?.employeeProjects })
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

  const formateProjectOptions = (projects) => {
    return formateRadioOptions(projects.map(({ project }) => ({ ...project })))
  }

  const formateName = (name) => {
    let nameArray = name.split('-');
    if (nameArray.length > 1) {
      return <View><Text style={{ fontWeight: 'bold' }}>{nameArray[0]}</Text><Text>- {nameArray[1]}</Text></View>
    }
    return name;
  }

  const formateRadioOptions = (values) => {
    return values.map(({ name, id, employeeContract = null }) => ({ label: formateName(name), value: id, employeeContract }))
  }

  const onProjectSelection = (value) => {
    const selectedProject = state?.projects.find(({ project }) => project.id === value);
    setState({ ...state, selectedProject, selectedCraft: null })
    setResetCraft(true)
    setTimeout(() => {
      setResetCraft(false)
    }, 1000);
  }

  const onCraftSelection = (selectedCraft) => {
    setState({ ...state, selectedCraft })
  }

  const onSubmit = () => {
    const { selectedCraft, selectedProject } = state;
    navigation.navigate('TimeLogging', { optionState: { selectedProject, selectedCraft } })
  };

  return (
    <AppContainer hideHeader={true}>
      <ScrollView>
        <View style={styles.formWrapper}>
          {state?.projects && <>
            <Text style={[globalStyles.heading, { fontWeight: '400' }]}>CHOOSE PROJECT</Text>
            <RadioButtonRN
              boxActiveBgColor={'#f7dabb'}
              activeColor={'#ee7d00'}
              data={formateProjectOptions(state?.projects)}
              selectedBtn={({ label, value }) => onProjectSelection(value)}
            />
          </>}
          {state?.selectedProject && <>
            <Text style={[globalStyles.heading, globalStyles.mt3]}>Choose Craft</Text>
            <RadioButtonRN
              boxActiveBgColor={'#f7dabb'}
              activeColor={'#ee7d00'}
              initial={resetCraft && -1}
              data={formateRadioOptions(state?.selectedProject?.craft)}
              selectedBtn={(option) => onCraftSelection(option)}
            />
          </>}
          <AppButton disabled={!state?.selectedCraft || !state?.selectedProject} onPress={() => onSubmit()} label={'NEXT'} />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    marginTop: 50,
    marginBottom: 100
  }
})
