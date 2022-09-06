import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppFooter from './components/AppFooter';
import LoginScreen from './screens/LoginScreen';
import AppNavigation from './AppContainer';
import ChooseScreen from './screens/ChooseScreen';
import TimeLoggingScreen from './screens/TimeLoggingScreen';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Choose" component={ChooseScreen} options={{title: 'Choose Option'}}/>
        <Stack.Screen name="TimeLogging" component={TimeLoggingScreen} options={{title: 'Time Logging'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
