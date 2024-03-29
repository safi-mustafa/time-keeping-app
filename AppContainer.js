import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';

export default function AppContainer({ children, hideHeader=false }) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!hideHeader && <AppHeader />}
      {children}
      <AppFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#fff',
    backgroundColor: '#f2f8ff75',
    // justifyContent: 'center',
    // justifyContent: 'space-around',
  },
});
