import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState } from 'react';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './../../types/navigation';

const Add = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const videoSelector = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      generateVideoThumbnail(result.assets[0].uri)
    }
  };

  //Generate Thumbnail
  const generateVideoThumbnail = async (videoUri:string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoUri,
        {
          time: 10000,
        }
      );
      console.log(uri);
        navigation.navigate('preview',{
          video:videoUri,
          thumbnail:uri
        })
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View className='flex items-center justify-center pt-96'>
      <Image className='w-20 h-20' source={require('./../../assets/images/folderUpload.png')}/>
      <Text className='mt-10 font-bold text-xl'>Upload your video</Text>
      <Text className='mt-2'>Create your own story</Text>
      <TouchableOpacity onPress={videoSelector} className='p-3 mt-5 rounded-lg bg-black'>
        <Text className='text-white'>Select your video</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Add