import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ConfigureScreen from './screens/ConfigureScreen';
import * as Font from 'expo-font';
import CompEntScreen from './screens/CompEntScreen';
import CompIndScreen from './screens/CompIndScreen';
import PostScreen from './screens/PostScreen';
import PostInfo from './screens/PostInfo';
import LeaderboardsScreen from './screens/LeaderboardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './screens/EditProfile';
import HomeScreen from './screens/HomeScreen';

export default function App() {
 return (
   <SafeAreaView style={styles.container}>
     <StatusBar/>
     <HomeScreen />
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 
});
