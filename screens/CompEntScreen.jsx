import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';

function CompetitionScreen({navigation}) {
  const EnterImp = () => {
    navigation.navigate('Impressionism')
  }

  const EnterMin = () => {
    navigation.navigate("Minimalism")
  }

  const EnterPop = () => {
    navigation.navigate("PopArt")
  }

  const EnterSur = () => {
    navigation.navigate("Surrealism")
  }

  const EnterReal = () => {
    navigation.navigate("Realism")
  }

  const EnterCub = () => {
    navigation.navigate("Cubism")
  }

  return (
    <View style={styles.container}>
      <View style={styles.navHeader}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <View style={styles.content}>
        <View style={styles.textHold}>
          <Text style={styles.comp}>ALL COMPETITIONS</Text>
          <Text style={styles.compTwo}>CHOOSE A COMPETITION</Text>
        </View>
        <View style={styles.tileContainer}>
          <TouchableOpacity style={styles.tile} onPress={EnterImp}>
            <Image source={require("../assets/tile1.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Impressionism</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={EnterMin}>
            <Image source={require("../assets/tile2.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Minimalism</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={EnterPop}>
            <Image source={require("../assets/tile3.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Pop Art</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={EnterSur}>
            <Image source={require("../assets/tile4.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Surrealism</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={EnterReal}>
            <Image source={require("../assets/tile5.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Realism</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={EnterCub}>
            <Image source={require("../assets/tile6.png")} style={styles.tileImage} />
            <Text style={styles.tileText}>Cubism</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#131312',
    justifyContent: 'space-between',
  },
  logo: {
    height: 40,
    width: 40
  },
  headings: {
    color: 'white',
  },
  navHeader: {
    height: '10%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHold: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    marginHorizontal: 20,
    marginTop: 20,
  },
  navBarContainer: {
    alignSelf: 'stretch',
    marginBottom: 0,
    width: '100%'
  },
  tileContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 25
  },
  tile: {
    flexBasis: '30%',
    height: 160,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  tileText: {
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  tileImage: {
    height: '92%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
});

export default CompetitionScreen;
