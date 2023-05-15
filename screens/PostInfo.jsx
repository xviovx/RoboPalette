import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, Alert, ActivityIndicator, ImageBackground, TextInput } from 'react-native';
import NavBar from '../components/NavBar';
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostInfo = () => {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('the temp title');
  const [category, setCategory] = useState('');
  const [generator, setGenerator] = useState('');
  const [prompt, setPrompt] = useState('');

  const imagePath = '../assets/imageMisty.png';

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

const submit = () => {
  if(!email || !password) {
      Alert.alert("try again", "please fill in your email and password", [
          {text: 'try again'}
      ])
  } else {
      
      Alert.alert("You're in!", "Successfully logged in", [
          {text: 'Thanks', onPress: () => {
          }}
      ])
  }
}

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
  <Image style={{ width: '100%', height: 200 }} source={require(imagePath)} />
  <Text style={[styles.headings, { marginTop: 20, fontSize: 32, fontStyle: 'italic'}]}>{title}</Text>
  <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Category: <Text style={{fontWeight: 'normal'}}>Impressionism</Text></Text>
  <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Generator: <Text style={{fontWeight: 'normal'}}>Midjourney</Text></Text>
  <Text style={[styles.headings, { marginTop: 25, fontWeight: 'bold'}]}>Prompt: <Text style={{fontWeight: 'normal'}}>Impressionsim piece of forest with a faraway-looking path/ fairy tales --ar 6:6 --upbeta --q 2 --v 5</Text></Text>
  <View style={{ marginTop: 30, alignItems: 'center' }}>
    <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: 'xviovx' })}>
      <Text style={[styles.headings]}>
        By <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>xviovx</Text>
      </Text>
    </TouchableOpacity>
  </View>
</View>
      <View style={styles.navBarContainer}>
        <NavBar />
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
