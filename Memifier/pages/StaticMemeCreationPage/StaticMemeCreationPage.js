import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert } from 'react-native';
import styles from './styles';

const StaticMemeCreationPage = ({ route, navigation }) => {
  const { memeName, memeUrl } = route.params;

  const saveMeme = () => {
    Alert.alert(`${memeName} saved`);
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>{memeName}</Text>
      <Image style={styles.memeImage} source={{ uri: memeUrl }}/> 
      <View style={styles.buttonContainer}>
        <Button
          color="#888"
          title="Save Meme"
          onPress={() => saveMeme()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="#888"
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default StaticMemeCreationPage;