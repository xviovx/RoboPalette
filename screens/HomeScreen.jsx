import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllPostsFromCollection, getUserDocument } from '../services/firebaseDb';
import { useFocusEffect } from '@react-navigation/native';
import { getCurrentUser } from '../services/firebaseAuth';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {

  const userId = getCurrentUser().uid;
  const user = getCurrentUser();

  const [feedPosts, setFeedPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllPostsForCategory = async (category) => {
    const userId = getCurrentUser().uid;
    const addToFeed = await AsyncStorage.getItem('@addToFeed:' + category + ':' + userId);
    if (addToFeed === 'ADDED') {
      setRefreshing(true)
      const allPosts = await getAllPostsFromCollection();
      const feedPosts = allPosts.filter(post => post.category === category);
      
      for (let post of feedPosts) {
        const userData = await getUserDocument(post.userId);
        post.user = userData;
      }
      
      setRefreshing(false)
      return feedPosts;
    } else {
      return [];
    }
  }  

  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        let allFeedPosts = [];
      
        const categories = ["Minimalism", "Impressionism", "Pop Art", "Surrealism", "Realism", "Cubism"];
  
        for (let category of categories) {
          const feedState = await AsyncStorage.getItem('@addToFeed:' + category + ':' + userId);
          if (feedState === 'ADDED') {
            const categoryPosts = await getAllPostsForCategory(category);
            allFeedPosts = [...allFeedPosts, ...categoryPosts];
          }
        }
        
        setFeedPosts(allFeedPosts);
      };
  
      fetchPosts();
  

      return () => {
        //clean when not viewing the screen
      };
    }, [])
  );

  const renderItem = ({ item }) => {
    const date = item.date.toDate();
    const dateString = date.toLocaleString();
  
    return (
      <TouchableOpacity onPress={() => navigation.navigate('PostInfo', { post: item })} style={styles.post}>
        <View style={styles.postHeader}>
          <Image style={styles.userImage} source={{uri: item.user.image}} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.creator}</Text>
            <Text style={styles.postTitle}>{item.prompt}</Text>
          </View>
        </View>
        <Image style={styles.postImage} source={{uri: item.image}} />
        <View style={styles.postStats}>
          <View style={styles.likesContainer}>
            <View style={styles.iconsCon}>
              <Ionicons name="heart" size={16} color="white" />
              <Text style={styles.statsText}>{item.likes}</Text>
            </View>
            <Text style={styles.timePosted}>{dateString}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      </View>
      {feedPosts.length === 0 &&
        <View style={styles.textHold}>
          <Text style={styles.comp}>Welcome, {user.displayName}!</Text>
          <Text style={styles.compTwo}>Add a new competition to your feed to see the latest posts here!</Text>
        </View>}
      <FlatList
        data={feedPosts} 
        renderItem={renderItem} 
        keyExtractor={(item, index) => index.toString()} 
      />
    </View>
  );
}

export default HomeScreen;

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
    marginTop: 40,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  compTwo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    lineHeight: 25,
    textAlign: 'center'
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
    marginLeft: 5
  },
  
  timePosted: {
    color: 'white',
    fontSize: 10,
    marginRight: 10
  },
  
});

