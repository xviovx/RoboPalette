import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, ImageBackground, TextInput } from 'react-native';
import NavBar from '../components/NavBar';
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCurrentUser } from '../services/firebaseAuth';
import { addPostToCollection } from '../services/firebaseDb';
import { serverTimestamp } from 'firebase/firestore';

const PostScreen = ({navigation, route}) => {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(route.params?.category || '');
  const [generator, setGenerator] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false)

const createPost = async() => {
  setLoading(true)

  if(title && category && generator && prompt){
    var creatorInfo = getCurrentUser()

    var post = {
      image,
      title,
      category,
      generator,
      prompt,
      creator: creatorInfo.displayName,
      userId: creatorInfo.uid,
      date: serverTimestamp(), 
    }

    const success = await addPostToCollection(post)
    if(success){ 
      Alert.alert("Posted successfully!")
      setLoading(false)
      navigation.navigate("Home")
    } else {
      console.log("Error posting")
      Alert.alert("Failed to post!", "OK")
      setLoading(false)
    }
  } else {
    Alert.alert("Woops!", "Please complete all necessary fields")
  }
}

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
};

// const submit = () => {
//   if(!email || !password) {
//       Alert.alert("try again", "please fill in your email and password", [
//           {text: 'try again'}
//       ])
//   } else {
      
//       Alert.alert("You're in!", "Successfully logged in", [
//           {text: 'Thanks', onPress: () => {
//           }}
//       ])
//   }
// }

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
            <Text style={styles.comp}>ENTER COMPETITION</Text>
          </View>

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Title"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={title}
      onChangeText={newValue => setTitle(newValue)}/>

<TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Category"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={category}
      onChangeText={newValue => setCategory(newValue)}/>

<TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Generator Used"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={generator}
      onChangeText={newValue => setGenerator(newValue)}/>

<TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Prompt"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={prompt}
      onChangeText={newValue => setPrompt(newValue)}/>

            <TouchableOpacity style={styles.submitButton} onPress={createPost}>
                <View style={styles.buttonContent}>
                    <Text style={styles.submitButtonText}>CONFIRM</Text>
                </View>
            </TouchableOpacity>

        </View>
      </ScrollView>
      {/* <View style={styles.navBarContainer}>
        <NavBar />
      </View> */}
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
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
      }
});
