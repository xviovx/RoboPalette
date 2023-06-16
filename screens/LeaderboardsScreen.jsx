import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList} from 'react-native';
import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAllPostsFromCollection } from '../services/firebaseDb';

const LeaderboardsScreen = ({navigation}) => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPostsFromCollection();
      posts.sort((a, b) => b.likes - a.likes);  
      const topTenPosts = posts.slice(0, 10); 
      setTopPosts(topTenPosts);
    };

    fetchPosts();
  }, []);

  const handleImagePress = (item) => {
    navigation.navigate("PostInfo", {post: item});
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <Text style={styles.imageNumber}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color='black'/>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textHold}>
          <Text style={styles.comp}>LEADERBOARDS</Text>
          <Text style={styles.compTwo}>Top 10</Text>
        </View>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          data={topPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default LeaderboardsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131312',
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
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textHold: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  comp: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  compTwo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageNumber: {
    position: 'absolute',
    bottom: 5,
    right: 20,
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
});
