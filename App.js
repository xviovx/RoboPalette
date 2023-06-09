import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConfigureScreen from './screens/ConfigureScreen';
import * as Font from 'expo-font';
import CompEntScreen from './screens/CompEntScreen';
import PostScreen from './screens/PostScreen';
import PostInfo from './screens/PostInfo';
import LeaderboardsScreen from './screens/LeaderboardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './screens/EditProfile';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './components/NavBar';
import HomeTab from './navigators/NavTab';
import NavTab from './navigators/NavTab';
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Impressionism from './screens/Competitions/Impressionism';
import Minimalism from './screens/Competitions/Minimalism';
import PopArt from './screens/Competitions/PopArt';
import Surrealism from './screens/Competitions/Surrealism';
import Realism from './screens/Competitions/Realism';
import Cubism from './screens/Competitions/Cubism';


const Stack = createNativeStackNavigator();

export default function App() {

const [loggedIn, setLoggedIn] = useState(false)

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if(user){
      setLoggedIn(true)
    }else {
      setLoggedIn(false)
    }
  })

  return unsubscribe;
}, [])

 return (
   <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Register' screenOptions={{
            headerShown: false,
            animationEnabled: false, // Disable transition animations
          }}>
            {!loggedIn ? (
              <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Configure" component={ConfigureScreen} options={{ headerShown: false }} />
              </>
            ): (
              <>
              <Stack.Screen name="Nav" component={NavTab} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="PostInfo" component={PostInfo}/>
              <Stack.Screen name="Impressionism" component={Impressionism} />
              <Stack.Screen name="Minimalism" component={Minimalism} />
              <Stack.Screen name="PopArt" component={PopArt} />
              <Stack.Screen name="Surrealism" component={Surrealism} />
              <Stack.Screen name="Realism" component={Realism} />
              <Stack.Screen name="Cubism" component={Cubism} />
              <Stack.Screen name="Enter" component={PostScreen} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 
});
