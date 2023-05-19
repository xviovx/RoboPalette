import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CompEntScreen from '../screens/CompEntScreen'
import LeaderboardsScreen from '../screens/LeaderboardsScreen'
import EditProfile from '../screens/EditProfile'
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CompetitionScreen from '../screens/CompEntScreen'
import PostScreen from '../screens/PostScreen'

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
<Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Competitions"
    component={CompetitionScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="trophy-outline" color={color} size={25} />
      ),
    }}
  />
  <Tab.Screen
    name="Enter"
    component={PostScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="add-outline" color={color} size={25} />
      ),
    }}
  />
  <Tab.Screen
    name="Leaderboards"
    component={LeaderboardsScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="bar-chart-outline" color={color} size={25} />
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color={color} size={25} />
      ),
    }}
  />
    </Tab.Navigator>
  )
}

export default HomeTab

const styles = StyleSheet.create({})