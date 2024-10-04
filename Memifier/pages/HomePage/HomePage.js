import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import styles from './styles';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button color="#888"
                title="Go to Meme Templates"
                onPress={() => navigation.navigate('Meme Templates')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888"
                title="Go to Meme Clips"
                onPress={() => navigation.navigate('Meme Clips')} />
      </View>
    </View>
  );
};

export default HomePage;