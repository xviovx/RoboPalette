import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import NavBar from '../components/NavBar';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({navigation}) => {

  const handleImagePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access the image library.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setSelectedImage({ uri: pickerResult.uri });
    }
  };

    const [username, setUsername] = useState('xviovx')
    const [location, setLocation] = useState('South Africa')
    const [about, setAbout] = useState('certified proompter 🥸🧑🏻‍💻')

    const [selectedImage, setSelectedImage] = useState(require('../assets/user-image.png'));

    const saveChanges = () => {
      setLoading(true)
      if(!email || !password) {
          Alert.alert("try again", "please fill in your email and password", [
              {text: 'try again', onPress: () => { setLoading(false) }}
          ])
      } else {
          
          Alert.alert("You're in!", "Successfully logged in", [
              {text: 'Thanks', onPress: () => {
                  setLoading(false)
              }}
          ])
      }
  }

    const [loading, setLoading] = useState(false)

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
      <TouchableOpacity onPress={handleImagePress} activeOpacity={0.7}>
          <View style={styles.userImage}>
            <Image source={selectedImage} style={styles.userImageStyle} />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>CHANGE IMAGE</Text>
            </View>
          </View>
        </TouchableOpacity>
  <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Username"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={username}
      onChangeText={newValue => setUsername(newValue)}/>
  <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="Location"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={location}
      onChangeText={newValue => setLocation(newValue)}/>
  <TextInput 
      style={styles.input}
      keyboardType='default'
      placeholder="About"
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      defaultValue={about}
      onChangeText={newValue => setAbout(newValue)}/>

<TouchableOpacity style={styles.submitButton} onPress={saveChanges}>
                <View style={styles.buttonContent}>
                    <Text style={styles.submitButtonText}>SAVE CHANGES</Text>
                </View>
            </TouchableOpacity>
  {/* <View style={styles.linkBreak}></View>
  <Text style={styles.competitionsNumber}>2</Text>
  <Text style={styles.competitionsText}>competitions entered</Text> */}
</View>


      <View style={styles.navBarContainer}>
        <NavBar />
      </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
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
  content: {
    flex: 1,
    justifyContent: '',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%'
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  userImageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 75,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 75,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'normal',
  },
  userName: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    color: 'white',
    marginTop: 20
  },
  description: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 25,
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
  linkBreak: {
    alignSelf: 'center',
    marginTop: 10,
    height: 0.5,
    width: '60%',
    backgroundColor: 'white',
    opacity: '0.2'
  },
  competitionsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
    marginBottom: 20
  },
  competitionsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  submitButton: {
    width: '100%',
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
  
});
