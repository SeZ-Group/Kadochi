import { StyleSheet } from 'react-native';
import Questions from './app/screens/Questions';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Yaghut': require('./app/assets/fonts/nadine.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Questions />
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
