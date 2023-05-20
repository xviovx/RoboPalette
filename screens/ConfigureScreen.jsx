import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { registerNewUser } from '../services/firebaseAuth';

const ConfigureScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null);
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');

    const [loading, setLoading] = useState(false)

    const registerUser = () => {
        console.log("registering.....")
        registerNewUser(email, password, image, about, location)
    }

    //function that executes when the user tries to log on
    // const logOn = () => {
    //     setLoading(true)
    //     if(!email || !password) {
    //         Alert.alert("try again", "please fill in your email and password", [
    //             {text: 'try again', onPress: () => { setLoading(false) }}
    //         ])
    //     } else {
            
    //         Alert.alert("You're in!", "Successfully logged in", [
    //             {text: 'Thanks', onPress: () => {
    //                 setLoading(false)
    //             }}
    //         ])
    //     }
    // }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }          
    };

  return (
    <ImageBackground source={require('../assets/log_bg.png')} style={styles.background}>

<View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.heading}>Personalize Your Profile</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>

                {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Location"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={location}
      onChangeText={newValue => setLocation(newValue)}/>

    {/* <Text style={styles.inputLabel}>Password</Text> */}
    <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="About you"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={about}
      onChangeText={newValue => setAbout(newValue)}/>
      
    { !loading ? (
        <View>
            <TouchableOpacity style={styles.submitButton} onPress={registerUser}>
                <View style={styles.buttonContent}>
                    <Text style={styles.submitButtonText}>CONFIRM</Text>
                </View>
            </TouchableOpacity>


            {/* <Button title="or SIGN IN" color={'white'} titleStyle={styles.buttonTitle}/> */}

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
        marginTop: 60
    },    
    buttonTitle: {
        textDecorationLine: 'underline'
      },
    logo: {
        height: 110,
        width: 110,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 4,
        marginBottom: 50,
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
        textAlignVertical: 'center' // add this line
      }
      
})

  