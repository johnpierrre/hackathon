import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';

const backgroundImage = require("../../assets/background.jpg");

const HomePage = ({ navigation }) => {
  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.container}
    >
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Meme Templates')}
        >
          <Text style={styles.buttonText}> Templates </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Meme Clips')}
        >
          <Text style={styles.buttonText}> Clips </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
