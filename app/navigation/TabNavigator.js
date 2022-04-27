import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import AddScreen from '../Screens/AddScreen';
import HomeScreen from '../Screens/HomeScreen';

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor: "grey",
            tabBarInactiveBackgroundColor: "lightgrey"
          }} initialRouteName="Home">
        <Tab.Screen 
            name="Home" 
            component={HomeScreen}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                    <MaterialCommunityIcons size={30} 
                    name="book"
                    iconColor='#FFF'
                    backgroundColor="#000" />
            }}
        />
        <Tab.Screen 
            name="Add" 
            component={AddScreen}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                    <MaterialCommunityIcons size={30} 
                    name="account-multiple-plus"
                    iconColor='#FFF'
                    backgroundColor="#000" />
            }}
        />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})