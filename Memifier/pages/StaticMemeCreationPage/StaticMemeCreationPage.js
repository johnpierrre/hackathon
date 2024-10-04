import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Sepia } from 'react-native-image-filter-kit';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const StaticMemeCreationPage = ({ route, navigation }) => {
  const { memeName, memeUrl } = route.params;
  const viewRef = useRef();
  const [selectedImage, setSelectedImage] = useState({ uri: memeUrl });
  const [permissionResult, setPermissionResult] = useState(false);

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

  const saveToGallery = async (fileUri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Recent', asset, false);
        Alert.alert('Success', 'Image saved to gallery!');
      } else {
        Alert.alert('Permission Denied', 'Cannot save image without permission');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save the image');
    }
  };

  const saveMeme = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1.0,
      });
      
      await saveToGallery(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to save meme');
      console.error('Error saving meme:', error);
    }
  };

  /*
  const shareMeme = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1.0,
      });

      if (!uri) {
        Alert.alert('Error', 'Failed to capture meme image');
        return;
      }

      const fileUri = `${FileSystem.cacheDirectory}meme_${Date.now()}.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      console.log('File URI:', fileUri);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('Recent', asset, false);
        Alert.alert('Success', 'Image saved to gallery!');

        const shareResponse = await Share.share({
          url: asset.uri,
          message: `Check out my meme: ${memeName}`,
        });

        console.log('Share response:', shareResponse);
      } else {
        Alert.alert('Permission Denied', 'Cannot save image without permission');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share meme');
      console.error('Error sharing meme:', error);
    }

      <View style={styles.buttonContainer}>
        <Button color="#888" title="Share Meme" onPress={shareMeme}/>
      </View>
  */
  
  return (
    <View style={styles.container}>
      <ViewShot ref={viewRef} options={{ format: "png", quality: 0.8 }} style={styles.canvasContainer}>
        {selectedImage.uri && (
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.memeImage}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>{memeName}</Text>
      </ViewShot>
           
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Pick Image" onPress={pickImage}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Save Meme" onPress={saveMeme}/>
      </View>
    </View>
  );
};

export default StaticMemeCreationPage;
