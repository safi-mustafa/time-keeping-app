import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "../api-client";
import AppContainer from "../AppContainer";
import { API_BASE_URL } from "../constants";

import { globalStyles } from "../utility/globalStyles";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {

  const [value, setValue] = useState(null);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSubmit = () => {
    axios
      .post(`${API_BASE_URL}/Account/Login?pincode=${value}`)
      .then(({ data }) => {
        // console.log("🚀 ~ file: LoginScreen.js ~ line 46 ~ .then ~ data", data.data)
        storeData(data.data)
        navigation.navigate('Choose')
      }, (errors) => {
        // console.log("🚀 ~ file: LoginScreen.js ~ line 48 ~ .then ~ errors", errors)
        Toast.show('Pincode is incorrect', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: '#cf222e'
        })
      })
  };

  const storeData = async (value) => {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('user', jsonValue)
  }

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
        <TouchableOpacity onPress={() => onSubmit()} style={globalStyles.btnPrimary}><Text style={globalStyles.btnText}>Login</Text></TouchableOpacity>
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
