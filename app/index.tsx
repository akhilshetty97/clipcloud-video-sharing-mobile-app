// app/index.tsx
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './LoginScreen/LoginScreen';

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf')
  })
  
  return (
    <View className='flex-1'>
      <LoginScreen/>
    </View>   
  );
}