import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native'
import { registerNewUser } from '../services/firebaseAuth';

const RegisterScreen = ( {navigation} ) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [loading, setLoading] = useState(false)

    const registerLoad = () => {
        if(email && password && username) {
            setLoading(true);
        }
    }
    
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    const signUpContinue = () => {
        if(!email || !password || !username) {
            Alert.alert("Try again", "Please fill in all your details", [
                {text: 'Try again', onPress: () => { setLoading(false) }}
            ]);
        } else if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address", [
                {text: 'Ok', onPress: () => { setLoading(false) }}
            ]);
        } else {
            setLoading(false);
            navigation.navigate('Configure', { username, email, password });
        }
    }      

  return (
    <ImageBackground source={require('../assets/log_bg.png')} style={styles.background}>

    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.heading}>REGISTER</Text>

      <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Username"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={username}
      onChangeText={newValue => setUsername(newValue)}/>


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
            <TouchableOpacity style={styles.submitButton} onPress={() => { signUpContinue(username, email, password); registerLoad();}}>
    <View style={styles.buttonContent}>
        <Text style={styles.submitButtonText}>CONTINUE</Text>
     </View>
</TouchableOpacity>

            <Button onPress={() => navigation.navigate('Login')} title="or SIGN IN" color={'white'} titleStyle={styles.buttonTitle}/>

        </View>
    ) : <ActivityIndicator animating={loading} size={40}/> }

    </View>
    </ImageBackground>
    
  )
}

export default RegisterScreen

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

  