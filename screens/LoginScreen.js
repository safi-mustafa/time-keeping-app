import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AppContainer from "../AppContainer";

import { globalStyles } from "../utility/globalStyles";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({navigation}) {

  const [value, setValue] = useState(null);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    navigation.navigate('Choose')
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      // setSubmitting(false);
      // navigation.navigate("BottomTab", { ...values });
    }, 400);
  };

  return (
    <AppContainer>
      <View style={styles.formWrapper}>
        <Text style={[globalStyles.heading]}>Employee Login</Text>
        <Text style={[globalStyles.textCenter]}>Enter last four digits of SSN</Text>
        <CodeField
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity onPress={()=>onSubmit()} style={globalStyles.btnPrimary}><Text style={globalStyles.btnText}>Login</Text></TouchableOpacity>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    display: 'flex',
    marginVertical: 100,
  },
  codeFieldRoot: {
    marginVertical: 10
  },
  cell: {
    width: 55,
    height: 70,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
})
