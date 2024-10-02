import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Go to Image Editing" onPress={() => navigation.navigate('ImageEditing')} />
      <Button title="Go to Video Editing" onPress={() => navigation.navigate('VideoEditing')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomePage;
