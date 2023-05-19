import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import NavBar from '../components/NavBar';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const images = [
  require('../assets/image1.png'),
  require('../assets/image2.png'),
  require('../assets/image3.png'),
  require('../assets/image4.png'),
  require('../assets/image5.png'),
  require('../assets/image6.png'),
  require('../assets/image7.png'),
  require('../assets/image8.png'),
  require('../assets/image9.png'),
  require('../assets/image10.png')
];

const LeaderboardsScreen = () => {

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.textHold}>
            <Text style={styles.comp}>LEADERBOARDS</Text>
            <Text style={styles.compTwo}>Top 10</Text>
          </View>
          <FlatList
  style={{ alignSelf: 'center', marginTop: 20 }}
  contentContainerStyle={{ alignItems: 'center' }}
  numColumns={2}
  data={images}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={{ margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={item}
          style={{ width: 150, height: 150, borderRadius: 10 }}
        />
        <Text style={styles.imageNumber}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  )}
/>



        </View>
      </ScrollView>
      {/* <View style={styles.navBarContainer}>
        <NavBar />
      </View> */}
    </View>
  )
}

export default LeaderboardsScreen

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
    backgroundColor: 'black'
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 25
  },
  textHold: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  comp: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  compTwo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10
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
  buttonText:{
    fontSize :16,
    fontWeight:'bold',
    textAlign:'center'
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%'
  }
});
