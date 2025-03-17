import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Questions from './app/screens/Questions';

export default function App() {
  return <Questions />;
    // <View style={styles.container}>
    //   <Text>Kadochi made by SeZ team!</Text>
    //   <StatusBar style="auto" />
    // </View>
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
