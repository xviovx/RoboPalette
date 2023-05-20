import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import NavBar from '../components/NavBar';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {

  const handleLogout = () => {
    // Perform logout actions here
    // For example, clear user session, navigate to login screen, etc.
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Replace 'EditProfile' with your actual screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color='white'/>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      </View>
     
      <View style={styles.content}>
        <View style={styles.userImage}>
          <Image source={require('../assets/user-image.png')} style={styles.userImageStyle}/>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={25} color="black" />
          </TouchableOpacity>
        <Text style={styles.userName}>xviovx</Text>
        <Text style={styles.location}>South Africa</Text>
        <Text style={styles.description}>certified proompter 🥸🧑🏻‍💻</Text>
        <View style={styles.linkBreak}></View>
        <Text style={styles.competitionsNumber}>2</Text>
        <Text style={styles.competitionsText}>competitions entered</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="exit-outline" size={25} color="white" />
      </TouchableOpacity>

      {/* <View style={styles.navBarContainer}>
        <NavBar />
      </View> */}
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
  },
  navHeader: {
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'black'
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 25
  },
  content: {
    flex: 1,
    justifyContent: '',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 10,
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%'
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
  },
  userImageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 75,
  },
  userName: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    color: 'white',
    marginTop: 20
  },
  description: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 25,
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
  linkBreak: {
    alignSelf: 'center',
    marginTop: 10,
    height: 0.5,
    width: '60%',
    backgroundColor: 'white',
    opacity: '0.2'
  },
  competitionsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
    marginBottom: 20
  },
  competitionsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,

  },
});
