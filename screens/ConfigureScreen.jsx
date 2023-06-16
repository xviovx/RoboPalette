import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { RouteProp } from '@react-navigation/native';
import { registerNewUser } from '../services/firebaseAuth';

const ConfigureScreen = ({navigation, route}) => {

    const { username, email, password } = route.params;
    const [userInfo, setUserInfo] = useState({ username, email, password });

    const [image, setImage] = useState(null);
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

    const [loading, setLoading] = useState(false)

    const registerUser = async () => {
      console.log("registering.....")
      try {
        await registerNewUser({ username, email, password, image, about, location });
        registerLoad();
      } catch (error) {
        console.error("Error registering user: ", error);
      }
    }

    const registerLoad = () => {
      setLoading(true)
      if(!about || !location) {
          Alert.alert("Try again", "Please complete all fields", [
              {text: 'Ok', onPress: () => { setLoading(false) }}
          ])
      } else {
          setLoading(false)
      }
    }  

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
          
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            // Once image is selected, change the text
            setUploadButtonText('Image selected!');
        }          
    };

  return (
    <ImageBackground source={require('../assets/log_bg.png')} style={styles.background}>

    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.heading}>PERSONALIZE YOUR PROFILE</Text>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>{uploadButtonText}</Text>
        </TouchableOpacity>

        <TextInput 
            style={styles.input}
            keyboardType='default'
            placeholder="Location"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            defaultValue={location}
            onChangeText={newValue => setLocation(newValue)}
        />

        <TextInput 
            style={styles.input}
            keyboardType='default'
            placeholder="About you"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            defaultValue={about}
            onChangeText={newValue => setAbout(newValue)}
        />
      
        { !loading ? (
            <View>
                <TouchableOpacity style={styles.submitButton} onPress={() => { registerUser(); registerLoad();}}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.submitButtonText}>CONFIRM</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ) : <ActivityIndicator animating={loading} size={40}/> }
    </View>
    </ImageBackground>  
  )
}

export default ConfigureScreen

export const styles = StyleSheet.create({
    
  container: {
      padding: 20,
      height: '100%',
      marginTop: 20
  },    
  buttonTitle: {
      textDecorationLine: 'underline'
  },
  logo: {
      height: 110,
      width: 110,
      alignSelf: 'center',
      marginBottom: 10,
      resizeMode: 'contain',
  },
  heading: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      letterSpacing: 4,
      marginBottom: 20,
      marginTop: 10
  },
  inputLabel: {
      fontSize: 16,
      marginTop: 15,
      marginBottom: 10,
      paddingLeft: 5,
      color: 'white'
  },
  uploadButton: {
      height: 60,
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
      fontSize: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  uploadButtonText: {
      color: 'rgba(255, 255, 255, 0.5)',
      textAlignVertical: 'center',
      paddingTop: 10,
      fontSize: 16
  },
  input: {
      height: 60,
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
      fontSize: 16
  },
  inputAbout: {
      height: 90,
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
      paddingLeft: 10,
      borderRadius: 5,
      marginBottom: 30,
      fontSize: 16
  },
  submitButton: {
      height: 60,
      backgroundColor: '#3B84C5',
      marginTop: 30,
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
      textAlignVertical: 'center'
  },
  image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 30,
  }
})


  