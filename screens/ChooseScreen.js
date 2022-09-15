import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';

import AppContainer from "../AppContainer";
import AppButton from "../components/AppButton";
import { globalStyles } from "../utility/globalStyles";
import { userData } from "../utility/utility";
import { API_BASE_URL } from "../constants";
import axios from "../api-client";

export default function ChooseScreen({ navigation }) {
  const [state, setState] = useState({ selectedCraft: null, selectedProject: null });

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const user = await userData();
    getProjects(user?.userDetail?.id)
    setState({ ...state, user })
  }

  const getProjects = (id) => {
    axios.get(`${API_BASE_URL}/Timesheet/GetProjects?employeeId=${id}`).then(({ data }) => {
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

  const formateRadioOptions = (values) => {
    return values.map(({ name, id }) => ({ label: name, value: id }))
  }

  const onProjectSelection = (value) => {
    const selectedProject = state?.projects.find(({ project }) => project.id === value);
    setState({ ...state, selectedProject })
  }

  const onCraftSelection = (selectedCraft) => {
    setState({ ...state, selectedCraft })
  }

  const onSubmit = (values) => {
    const { selectedCraft, selectedProject } = state;
    navigation.navigate('TimeLogging', { optionState: { selectedProject, selectedCraft } })
  };

  return (
    <AppContainer>
      <ScrollView>
        <View style={styles.formWrapper}>
          {state?.projects && <>
            <Text style={[globalStyles.heading]}>Choose Project</Text>
            <RadioButtonRN
              data={formateProjectOptions(state?.projects)}
              selectedBtn={({ label, value }) => onProjectSelection(value)}
            />
          </>}
          {state?.selectedProject && <>
            <Text style={[globalStyles.heading, globalStyles.mt3]}>Choose Craft</Text>
            <RadioButtonRN
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
