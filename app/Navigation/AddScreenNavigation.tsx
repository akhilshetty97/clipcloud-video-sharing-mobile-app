import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Add from './../Add/Add'
import Preview from './../Add/Preview'

const Stack = createStackNavigator();

const AddScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="add-screen" component={Add} />
      <Stack.Screen name="preview" component={Preview} />
    </Stack.Navigator>
  )
}

export default AddScreenNavigation