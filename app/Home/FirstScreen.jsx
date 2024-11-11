import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '@/utils/SupabaseConfig';
import VideoThumbnail from './VideoThumbnail'

const HomeScreen = () => {
  const {user} = useUser();
  const [videoList, setvideoList] = useState([]);

  useEffect(()=>{
    user&&updateProfileImage();
    getVideos();
  },[user])

  const updateProfileImage = async() => {
    const {data, error} = await supabase.from('Users')
    .update({'profileImage':user?.imageUrl})
    .eq('email', user?.primaryEmailAddress?.emailAddress)
    .is('profileImage',null)
    .select();
  }

  const getVideos = async () => {
    const {data,error} = await supabase
    .from('Media')
    .select('*, Users(username, name, profileImage)')
    .range(0, 9);
    console.log(data);
    console.log(error);
    if (data) {
      setvideoList(data); // Add this line to update the state
    }
    if (error) {
      console.log('Error fetching videos:', error);
    }
  }

  return (
    <View className='p-6 pt-20'>
      <View className='flex flex-row items-end justify-between'>
        <Text className='text-2xl font-bold'>ClipCloud</Text>
        <Image className='w-[50px] h-[50px] rounded-full' source={{uri:user?.imageUrl}}/>
      </View>
      <View>
        <FlatList data={videoList} numColumns={2} renderItem={({item,index})=>(
          <VideoThumbnail video={item}/>
        )}/>
        {/* <VideoThumbnail/> */}
      </View>
    </View>
  )
}

export default HomeScreen