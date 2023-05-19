import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import NavBar from '../components/NavBar';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color='white'/>
        </TouchableOpacity> */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
        <View style={styles.post}>
  <View style={styles.postHeader}>
    <Image style={styles.userImage} source={require('../assets/user-image.png')} />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>xviovx</Text>
      <Text style={styles.postTitle}>Impressionist piece generated with Midjourney</Text>
    </View>
  </View>
  <Image style={styles.postImage} source={require('../assets/imageMisty.png')} />
  <View style={styles.postStats}>
    <View style={styles.likesContainer}>
      <View style={styles.iconsCon}>
      <Ionicons name="heart" size={16} color="white" />
      <Text style={styles.statsText}>123</Text>
      <Ionicons name="eye" size={16} color="white" />
      <Text style={styles.statsText}>545</Text>
      </View>
      <Text style={styles.timePosted}>2 hours ago</Text>
    </View>
  </View>
</View>

        </View>
      </ScrollView>
      {/* <View style={styles.navBarContainer}>
        <NavBar />
      </View> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
  },
  imageNumber: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  headings: {
    color: 'white',
  },
  navHeader: {
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  logo: {
    height: 40,
    width: 40,
  },
  textHold: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  comp: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  compTwo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: '',
    alignItems: 'flex-start',
    marginHorizontal: 0,
    marginTop: 20,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%',
  },
  post: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTitle: {
    color: 'white',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 20
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    marginRight: 15
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  iconsCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  timePosted: {
    color: 'white',
    fontSize: 10,
    marginRight: 10
  },
  
});

