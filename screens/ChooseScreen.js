import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RadioButtonRN from 'radio-buttons-react-native';

import AppContainer from "../AppContainer";
import AppButton from "../components/AppButton";
import { globalStyles } from "../utility/globalStyles";
import { craftOptions, projectOptions } from "../assets/values/options";

export default function ChooseScreen({ navigation }) {

  const [value, setValue] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = t("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t("Invalid email address");
    }
    if (!values.password) {
      errors.password = t("Password is required");
    }
    return errors;
  };

  const onSubmit = (values) => {
    navigation.navigate('TimeLogging')
  };

  return (
    <AppContainer>
      <ScrollView>
        <View style={styles.formWrapper}>
          <Text style={[globalStyles.heading]}>Choose Project</Text>
          <RadioButtonRN
            data={projectOptions}
            selectedBtn={(e) => console.log(e)}
          />
          <Text style={[globalStyles.heading, globalStyles.mt3]}>Choose Craft</Text>
          <RadioButtonRN
            data={craftOptions}
            selectedBtn={(e) => console.log(e)}
          />
          <AppButton onPress={() => onSubmit()} label={'NEXT'} />
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
