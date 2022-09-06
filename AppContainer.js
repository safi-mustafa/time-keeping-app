import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';

export default function AppContainer({ children }) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppHeader />
      {children}
      <AppFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    // justifyContent: 'space-around',
  },
});
