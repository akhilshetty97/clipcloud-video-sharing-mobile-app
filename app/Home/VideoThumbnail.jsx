import { View, Text, Image } from 'react-native'
import React from 'react'

const VideoThumbnail = ({video}) => {
  return (
    <View className='flex-1 m-4'>
      <View className='relative'>
        <Image 
          source={{uri:video?.thumbnailUrl}} 
          className='w-full h-80 rounded-xl'
        />
        {/* User info container positioned absolutely at bottom left */}
        <View className='absolute bottom-3 left-3 flex-row items-center bg-black/50 p-2 rounded-lg'>
          <Image 
            source={{uri:video?.Users?.profileImage}} 
            className='w-8 h-8 rounded-full'
          />
          <Text className='ml-2 text-white font-medium'>
            {video?.Users?.username}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default VideoThumbnail