import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPostsFromCollection } from '../../services/firebaseDb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../../services/firebaseAuth';

// const images = [
//   require('../../assets/image1.png'),
//   require('../../assets/image2.png'),
//   require('../../assets/image3.png'),
//   require('../../assets/image4.png'),
//   require('../../assets/image5.png'),
//   require('../../assets/image6.png'),
//   require('../../assets/image7.png'),
//   require('../../assets/image8.png'),
//   require('../../assets/image9.png'),
//   require('../../assets/image10.png'),
//   require('../../assets/image11.png'),
//   require('../../assets/image12.png'),
//   require('../../assets/image13.png')
// ];

const Impressionism = ({navigation}) => {

  const [impPosts, setImpPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [buttonColor, setButtonColor] = useState('#007AFF');

  const [addToFeedButtonText, setAddToFeedButtonText] = useState('ADD TO FEED');

  const userId = getCurrentUser().uid;

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('@addToFeed:' + userId);
        if(value !== null) {
          setAddToFeedButtonText(value);
          setButtonColor('#7000FF');
        }
      } catch(e) {
        // error reading value
      }
    })();
  }, []);

  const addToFeed = async () => {
    try {
      if (addToFeedButtonText === 'ADD TO FEED') {
        await AsyncStorage.setItem('@addToFeed:' + userId, 'ADDED');
        await AsyncStorage.setItem('@FeedPosts:' + userId, JSON.stringify(impPosts));
        setAddToFeedButtonText('ADDED');
        setButtonColor('#7000FF');
      } else {
        await AsyncStorage.removeItem('@addToFeed:' + userId);
        setAddToFeedButtonText('ADD TO FEED');
        setButtonColor('#007AFF');
      }
    } catch(e) {
      // save error
    }
  }

  const enterCompetition = () => {
    navigation.navigate('Enter',{ category: 'Impressionism' })
  }  

  //refreshes data each time page reloads
  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        const posts = await getAllImpPosts();
        setImpPost(posts);
      };
  
      fetchPosts();
  
      // Return a cleanup function to be called when the component is unmounted or unfocused.
      return () => {
        //clean when not viewing the screen
      };
    }, [])
  );
  

  //doesn't do that lol
//   useEffect(() => {
//     const fetchPosts = async () => {
//         const posts = await getAllImpPosts();
//         setImpPost(posts);
//     }

//     fetchPosts();
// }, []);

  const getAllImpPosts = async () => {
    setRefreshing(true)
    const allPosts = await getAllPostsFromCollection();
    const impPosts = allPosts.filter(post => post.category === "Impressionism");
    setRefreshing(false)
    return impPosts;
}

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color='white'/>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.textHold}>
          <Text style={styles.comp}>IMPRESSIONISM</Text>
          {/* <Text style={styles.compTwo}></Text> */}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#007AFF' }]} onPress={() => enterCompetition()}>
            <Text style={[styles.buttonText, { color: 'white' }]}>ENTER NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor, marginLeft: 20 }]} onPress={addToFeed}>
            <Text style={[styles.buttonText, { color: 'white' }]}>{addToFeedButtonText}</Text>
          </TouchableOpacity>
        </View>
        {/* {impPosts.map((post, index) => (
  <TouchableOpacity key={index} onPress={() => navigation.navigate('PostInfo', { post })}>
    <Text style={{ fontSize: 30, color: 'white' }}>{post.title}</Text>
  </TouchableOpacity>
))} */}

<FlatList
  style={{ alignSelf: 'center', marginTop: 20 }}
  contentContainerStyle={{ alignItems: '' }}
  numColumns={3}
  data={impPosts}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostInfo', { post: item })}>
      <View style={{ margin: 5, justifyContent: index % 3 === 0 ? 'flex-start' : (index % 3 === 2 ? 'flex-end' : 'center') }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 120, height: 120, borderRadius: 10 }}
        />
      </View>
    </TouchableOpacity>
  )}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={getAllImpPosts} />
  }
/>

      </View>
      {/* <View style={styles.navBarContainer}>
        <NavBar />
      </View> */}
    </View>
  )
}

export default Impressionism;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
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
    fontSize: 12,
    marginBottom: 20
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
