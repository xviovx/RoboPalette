import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native'
import { signInUser } from '../services/firebaseAuth'


const LoginScreen = ( {navigation} ) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const logLoad = async () => {
        setLoading(true);
        try {
            if (!email || !password) {
                Alert.alert("Try again", "Please complete all fields", [
                    {text: 'Try again'}
                ])
            } else {
                const signInResult = await signInUser(email, password)
                if (signInResult && signInResult.error) {
                    
                    Alert.alert("Error", "Failed to sign in. Please check your email and password.", [
                        {text: 'Ok'}
                    ])
                } else {
                    
                }
            }
        } catch (e) {
            
            console.log("An error occurred during sign in: ", e);
        } finally {
            setLoading(false);
        }
    }         

  return (
    <ImageBackground source={require('../assets/log_bg.png')} style={styles.background}>

<View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.heading}>LOGIN</Text>

      <TextInput 
      style={styles.input}
      keyboardType='email-address'
      placeholder="Email"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={email}
      onChangeText={newValue => setEmail(newValue)}/>

    <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Password"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={password}
      secureTextEntry={true}
      onChangeText={newValue => setPassword(newValue)}/>
      
    { !loading ? (
        <View>
            <TouchableOpacity style={styles.submitButton} onPress={logLoad}>
                <View style={styles.buttonContent}>
                    <Text style={styles.submitButtonText}>LET'S GO!</Text>
                </View>
            </TouchableOpacity>


            <Button onPress={() => navigation.navigate('Register')} title="or SIGN UP" color={'white'}/>

        </View>
    ) : <ActivityIndicator animating={loading} size={40}/> }

    </View>
    </ImageBackground>
    
  )
}

export default LoginScreen

export const styles = StyleSheet.create({
    
    container: {
        padding: 20,
        height: '100%',
        marginTop: 90
    },    
    logo: {
        height: 110,
        width: 110,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    heading: {
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 6,
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
      }
      
})

  