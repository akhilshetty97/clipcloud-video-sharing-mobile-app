import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Home/FirstScreen'
import Search from './../Search/Search'
import Add from './../Add/Add'
import AddScreenNavigation from './../Navigation/AddScreenNavigation'
import Profile from './../Profile/ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export class TabNavigation extends Component {
    render() {
      return (
        
          <Tab.Navigator
          screenOptions={{
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
              headerShown:false

          }}
          >
              <Tab.Screen name="Home" component={HomeScreen} 
              options={{
                  tabBarIcon: ({color, size, focused}) => (
                    focused?<Ionicons name="home" size={24} color="black" />:<Ionicons name="home-outline" size={24} color="black" />   
                  )
              }}
              />
              <Tab.Screen name="Search" component={Search} 
              options={{
                tabBarIcon: ({color, size, focused}) => (
                    focused?<FontAwesome5 name="search" size={22} color="black" />:<Ionicons name="search-outline" size={24} color="black" />   
                  )
              }}
              />
              <Tab.Screen name="Upload" component={AddScreenNavigation} 
              options={{
                tabBarIcon: ({color, size, focused}) => (
                    focused?<Ionicons name="add-circle" size={26} color="black" />:<Ionicons name="add-circle-outline" size={26} color="black" />
                  )
              }}/>
              <Tab.Screen name="Profile" component={Profile} 
              options={{
                tabBarIcon: ({color, size, focused}) => (
                    focused?<FontAwesome5 name="user-alt" size={22} color="black" />:<FontAwesome5 name="user" size={22} color="black" />  
                  )
              }}/>
          </Tab.Navigator>
      )
    }
  }

  export default TabNavigation;