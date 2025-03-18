import { StyleSheet } from 'react-native';
import Questions from './app/screens/Questions';
import Welcome from './app/screens/Welcome';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Result from './app/screens/Result';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Yaghut': require('./app/assets/fonts/nadine.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} / >
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Result" component={Result} />
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
