import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {ResizeMode} from 'expo-av'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import {supabase} from './../../utils/SupabaseConfig'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        if(signUp?.emailAddress) {
            const { data, error } = await supabase
            .from('Users')
            .insert([
              { name: signUp?.firstName + (signUp.lastName?''+signUp.lastName:'') , email: signUp?.emailAddress, username: signUp?.emailAddress.split('@')[0] },
            ])
            .select()

            if(data)
            {
              console.log(data)
            }
        }  
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])


  return (
    <View className='flex-1'>
      <Image 
      style={styles.image}
      source={{
        uri:'https://cdn.pixabay.com/photo/2018/02/01/06/45/travel-3122702_1280.jpg'
      }}
      resizeMode={ResizeMode.COVER}
      />
      <View className='flex items-center justify-between py-52'>
        <View className='items-center'>
          <Text className='text-white font-bold text-4xl'>ClipCloud</Text>
          <Text className='text-white text-2xl mt-5'>Your stories, our canvas</Text>
        </View>
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center absolute -bottom-80 gap-5 bg-white p-3 px-5 rounded-xl'>
          <Image className='w-8 h-8' source={require('./../../assets/images/google.png')}/>
          <Text className='text-lg'>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  });

export default LoginScreen

