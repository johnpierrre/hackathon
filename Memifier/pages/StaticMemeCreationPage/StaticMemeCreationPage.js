import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, Share } from 'react-native';
// import { captureRef } from 'react-native-view-shot';
// import * as FileSystem from 'expo-file-system';
// import { Sepia } from 'react-native-image-filter-kit';
// import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const StaticMemeCreationPage = ({ route, navigation }) => {
  const { memeName, memeUrl } = route.params;
  // const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({ uri: memeUrl });
  const [permissionResult, setPermissionResult] = useState(false);

  /*
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionResult(status === 'granted');
    };
    requestPermission();
  }, []);

  const pickImage = async () => {
    if (!permissionResult) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error picking image', error.message);
    }
  };

  const saveMeme = async () => {
    try {
      const uri = await captureRef(canvasRef, {
        format: 'gif',
        quality: 1.0,
      });
      
      const path = `${FileSystem.documentDirectory}meme.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: path,
      });
      Alert.alert('Success', `${memeName} saved to your device`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save meme');
      console.error('Error saving meme:', error);
    }
  };

  const shareMeme = async () => {
    try {
      const uri = await captureRef(canvasRef, {
        format: 'gif',
        quality: 1.0,
      });
      
      await Share.share({
        url: uri,
        message: `Check out my meme: ${memeName}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share meme');
      console.error('Error sharing meme:', error);
    }
  };
  */

  /*
      <View ref={canvasRef} style={styles.canvasContainer}>
        {selectedImage.uri && (
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.memeImage}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>{memeName()}</Text>
      </View>
      
      onPress={pickImage()} 
      onPress={saveMeme()}
      onPress={shareMeme()}
  */
      

  return (
    <View style={styles.container}>
            
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Pick Image" />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Save Meme"  />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Share Meme"  />
      </View>
    </View>
  );
};

export default StaticMemeCreationPage;
