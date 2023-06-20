import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import axios from "../api-client";
import AppContainer from "../AppContainer";
import { API_BASE_URL } from "../constants";

import { globalStyles } from "../utility/globalStyles";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {

  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false)
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onValueChange = (value) => {
    setValue(value);
  }

  useEffect(() => {
    if (value && value.length === 4) {
      onSubmit();
    }
  }, [value])

  const onSubmit = () => {
    if (!value || value === '' || value.length < 4) {
      Toast.show('Please enter valid pincode', {
        animation: true,
        delay: 0,
      })
      return
    }
    setLoading(true)
    axios
      .post(`${API_BASE_URL}/Account/Login?pincode=${value}`)
      .then(({ data }) => {
        setLoading(false)
        storeData(data.data)
        navigation.navigate('Choose')
        // navigation.replace('Choose')
      }, (error) => {
        console.log("🚀 ~ file: LoginScreen.js ~ line 61 ~ .then ~ error", JSON.stringify(error?.response))
        setLoading(false)
        let resMessage = error?.response?.data?.errors?.message;
        console.log("🚀 ~ file: LoginScreen.js ~ line 48 ~ .then ~ error", resMessage)
        let message = Array.isArray(resMessage) ? resMessage.join('.') : 'Something went wrong, Please try again.'
        message = `${message} - ${API_BASE_URL}`;
        Toast.show(message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
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
    <View marginTop={getStatusBarHeight() + 25} flex={1}>
      <AppContainer>
        <KeyboardAwareScrollView enableAutomaticScroll={true}>
          {loading && <ActivityIndicator size="large" color="#2B3CFF" style={styles.loader2} />}
          <View style={styles.formWrapper}>
            <Text style={[globalStyles.heading, {fontWeight: '400'}]}>EMPLOYEE LOGIN</Text>
            <Text style={[globalStyles.textCenter,{marginTop:15}]}>Enter last four digits of SSN</Text>
            <CodeField
              value={value}
              onChangeText={onValueChange}
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
            <TouchableOpacity disabled={loading} onPress={() => onSubmit()} style={globalStyles.btnPrimary}>
              {loading && <ActivityIndicator color={'#ffffff'} style={styles.loader} />}
              <Text style={globalStyles.btnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </AppContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    // display: 'flex',
    marginTop: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  codeFieldRoot: {
    marginVertical: 25,
  },
  cell: {
    width: 60,
    height: 70,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c6d9eb',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#93adc6',
  },
  loader: {
    position: 'absolute',
    top: 18,
    left: 75,
  },
  loader2: {
    position: 'absolute',
    alignSelf: 'center',
    top: 50
  }
})
