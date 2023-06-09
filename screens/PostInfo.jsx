import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, ImageBackground, TextInput, useRoute, Modal, Button } from 'react-native';
import NavBar from '../components/NavBar';
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getCurrentUser } from '../services/firebaseAuth';
import { deletePostFromCollection } from '../services/firebaseDb';

const PostInfo = ({navigation, route}) => {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('the temp title');
  const [category, setCategory] = useState('');
  const [generator, setGenerator] = useState('');
  const [prompt, setPrompt] = useState('');
  const [liked, setLiked] = useState('');

  const imagePath = '../assets/imageMisty.png';

  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

  // Access the post object from route.params
  const { post } = route.params;

  const deletePost = () => {
    // Open the modal when deletePost is called
    setModalVisible(true);
  }

  const handleDeleteConfirm = async () => {
    const result = await deletePostFromCollection(post.id);
    if(result) {
        // Navigate back or to another screen after successful deletion
        navigation.goBack();
        setModalVisible(false);
    } else {
        // Handle error here
    }
}

  const handleDeleteCancel = () => {

  }

  const likePost = () => {
    setLiked(prevLiked => !prevLiked);
    // You may also want to add code here to update your database
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
        <Image style={{ width: '100%', height: 200 }} source={{uri: post.image}} />
        <Text style={[styles.headings, { marginTop: 20, fontSize: 32, fontStyle: 'italic'}]}>{post.title}</Text>
        <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Category: <Text style={{fontWeight: 'normal'}}>{post.category}</Text></Text>
        <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Generator: <Text style={{fontWeight: 'normal'}}>{post.generator}</Text></Text>
        <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Prompt: <Text style={{fontWeight: 'normal'}}>{post.prompt}</Text></Text>
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: 'xviovx' })}>
            <Text style={[styles.headings]}>
              By <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>{post.creator}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
    <Ionicons name="heart" size={16} color="white" />
    <Text style={[styles.headings, { fontWeight: 'bold', marginLeft: 5 }]}>{post.likes}<Text style={{fontWeight: 'normal'}}> Likes</Text></Text>
</View>

        {getCurrentUser().uid == post.userId ? (
          <TouchableOpacity style={styles.deleteButton} onPress={deletePost}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        ) : null}
        {getCurrentUser().uid !== post.userId ? (
  <TouchableOpacity 
    style={liked ? styles.likedButton : styles.likeButton} 
    onPress={likePost}
  >
    <Text style={styles.likeButtonText}>{liked ? 'Unlike' : 'Like'}</Text>
  </TouchableOpacity>
) : null}

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your post?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteConfirm} style={styles.modalButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteCancel} style={styles.modalButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
    </View>
  )
}

export default PostInfo

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3B84C5',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
      author: {
        color: 'white',
        textAlign: 'center',
        marginTop: 30,
      },
      authorName: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
      },
      likeButton: {
        marginTop: 130,
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        width: '100%'
      },
      likeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
      },
      likedButton: {
        marginTop: 130,
        backgroundColor: '#7000FF',
        padding: 15,
        borderRadius: 10,
        width: '100%'
      },      
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
  },
  headings: {
    color: 'white',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
    fontSize: 16
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
  uploadButton: {
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
    marginTop: 20,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%'
},
uploadButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlignVertical: 'center',
    paddingTop: 10,
    fontSize: 16
  },
  comp: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  content: {
    flex: 1,
    justifyContent: '',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%'
  },
    submitButton: {
      width: '100%',
        height: 60,
        backgroundColor: '#3B84C5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center' // add this line
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      modalButton: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#841584',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
      deleteButton: {
        marginTop: 130,
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        width: '100%'
      },
      deleteButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
      },
});
