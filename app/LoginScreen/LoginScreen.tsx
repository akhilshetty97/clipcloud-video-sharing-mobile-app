import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Video, ResizeMode} from 'expo-av'

const LoginScreen = () => {
  return (
    <View className='flex-1'>
      <Video 
      style={styles.video}
      source={{
        uri:'https://cdn.pixabay.com/video/2021/04/15/71125-537986747_large.mp4'
      }}
      shouldPlay
      resizeMode={ResizeMode.COVER}
      isLooping={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  });

export default LoginScreen

