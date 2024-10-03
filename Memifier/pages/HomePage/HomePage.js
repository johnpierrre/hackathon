import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles'; 

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Go to Image Editing" onPress={() => navigation.navigate('ImageEditing')} />
      <Button title="Go to Video Editing" onPress={() => navigation.navigate('VideoEditing')} />
    </View>
  );
};

export default HomePage;
