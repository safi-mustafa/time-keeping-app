import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

import LoginScreen from './screens/LoginScreen';
import ChooseScreen from './screens/ChooseScreen';
import TimeLoggingScreen from './screens/TimeLoggingScreen';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Choose" component={ChooseScreen} options={{ title: 'CHOOSE OPTION' }} />
          <Stack.Screen name="TimeLogging" component={TimeLoggingScreen} options={{ title: 'TIMESHEET' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
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
