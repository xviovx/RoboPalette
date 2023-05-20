import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavBar = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="home-outline" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="trophy-outline" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="add-outline" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="bar-chart-outline" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person-outline" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 80,
  borderTopWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#f7f7f7',
  position: 'fixed',
  left: 0,
  right: 0
  }
 }; 

export default NavBar;
