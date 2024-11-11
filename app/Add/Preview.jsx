import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import {s3bucket} from '../../utils/S3BucketConfig';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '@/utils/SupabaseConfig';

const Preview = () => {
    // type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'preview'>
    // const route = useRoute<PreviewScreenRouteProp>();

    const route = useRoute();
    const navigation = useNavigation();
    const [description,setDescription] = useState("");
    const { thumbnail,video } = route.params;
    const [loading,setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const {user} = useUser();


    useEffect(() => {
        let timer;
        if (uploadSuccess) {
            timer = setTimeout(() => {
                navigation.navigate('Home');
            }, 3000); // Navigate to Home page after 3 seconds
        }
        return () => clearTimeout(timer);
    }, [uploadSuccess]);

    // Update updateMediaTable to accept videoUrl and imgUrl as parameters
    const updateMediaTable = async (videoUrl, imgUrl) => {
        const { data, error } = await supabase.from('Media')
            .insert({
                videoUrl: videoUrl,
                thumbnailUrl: imgUrl,
                emailAdd: user?.primaryEmailAddress?.emailAddress,
                description: description
            })
            .select();

        if (error) {
            console.log("Error updating Media table:", error);
        } else {
            console.log("Media table updated successfully:", data);
        }
    };

    // Modify publishButton to capture URLs directly
    const publishButton = async () => {
        setLoading(true);
        try {
            // Capture the video and image URLs directly
            const videoLocation = await uploadToS3(video, 'video');
            const imgLocation = await uploadToS3(thumbnail, 'image');

            if (videoLocation && imgLocation) {
                // Pass URLs directly to updateMediaTable
                await updateMediaTable(videoLocation, imgLocation);
                setUploadSuccess(true);
            } else {
                console.log("Error: Could not upload files");
            }
        } catch (e) {
            console.log("Error during upload or table update:", e);
        } finally {
            setLoading(false);
        }
    };

    const uploadToS3 = async (file, type) => {
        const fileType = file.split('.').pop();
        const parameters = {
            Bucket: 'clipcloud-app',
            Key: `clip-${Date.now()}.${fileType}`,
            Body: await fetch(file).then(resp => resp.blob()),
            ACL: 'public-read',
            ContentType: type === 'video' ? `video/${fileType}` : `image/${fileType}`,
        };
    
        try {
            const data = await s3bucket.upload(parameters).promise();
            console.log("File Uploaded:", data.Location);
            return data.Location; // Return the uploaded file's URL
        } catch (e) {
            console.log(e);
            return undefined;
        }
    };

    return (
        <KeyboardAvoidingView className='flex-1 bg-white' behavior='padding' keyboardVerticalOffset={Platform.OS==='ios'?10:0}>
            <ScrollView>
                <View className='flex flex-row items-center pt-20 pl-5 gap-2 '>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back-circle" size={42} color="black" />
                    </TouchableOpacity>
                    <Text className='text-xl'>Back</Text>
                </View>
                <View className='pt-4 items-center px-3'>
                    <Image 
                        className='mt-5 w-[300px] h-[400px] rounded-lg' 
                        source={{uri: thumbnail}}
                    />
                    <TextInput 
                        className='p-5 w-full mt-5 border-2 rounded-md text-center border-gray-500/60' 
                        numberOfLines={3} 
                        onChangeText={(value)=>setDescription(value)}
                        value={description}
                        placeholder='Description' 
                        placeholderTextColor="gray"
                        selectionColor="black"
                    />
                    <TouchableOpacity onPress={publishButton} className='p-3 mt-5 rounded-lg bg-black' style={{ opacity: loading || uploadSuccess ? 0.5 : 1 }} disabled={loading||uploadSuccess}>
                        <Text className='text-white'>Upload</Text>
                    </TouchableOpacity>
                    {loading && (
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
                    )}
                    {uploadSuccess && (
                        <View className="mt-4 bg-green-500 rounded-md p-4">
                            <Text className="text-white font-semibold">Upload Successful!</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Preview