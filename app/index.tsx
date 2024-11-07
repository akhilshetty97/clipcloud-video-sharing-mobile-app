// app/index.tsx
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './LoginScreen/LoginScreen';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import FirstScreen from './Home/FirstScreen'

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf')
  })
  
  return (
    <View className='flex-1'>
      <SignedIn>
        <FirstScreen/>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
    </View>   
  );
}