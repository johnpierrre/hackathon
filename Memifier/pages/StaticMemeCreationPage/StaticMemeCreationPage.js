import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import ViewShot from 'react-native-view-shot';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const StaticMemeCreationPage = ({ route }) => {
  const { memeName, memeUrl } = route.params;
  const viewRef = useRef();
  const [currentMemeUrl, setCurrentMemeUrl] = useState(memeUrl);
  const [addedImages, setAddedImages] = useState([]);
  const [permissionResult, setPermissionResult] = useState(false);
  
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionResult(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission to access media library is required!');
      }
    };
    requestPermissions();
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
        const newImage = {
          uri: result.assets[0].uri,
          scale: 1,
          position: { x: 0, y: 0 },
          rotation: 0,
        };
        console.log('Added image:', newImage); // Check if the image URI is valid
        setAddedImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      Alert.alert('Error picking image', error.message);
    }
  };

  const _rotate90 = async () => {
    try {
      const manipResult = await manipulateAsync(
        currentMemeUrl,
        [{ rotate: 90 }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setCurrentMemeUrl(manipResult.uri);
    } catch (error) {
      Alert.alert('Error rotating/flipping image', error.message);
    }
  };

  const saveMeme = async () => {
    try {
      const uri = await viewRef.current.capture();
      if (permissionResult) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Meme saved!', `Your meme has been saved to the gallery: ${asset.uri}`);
      }
    } catch (error) {
      Alert.alert('Error saving meme', error.message);
    }
  };

  const handlePanGestureEvent = (event, index) => {
    const { translationX, translationY } = event.nativeEvent;
    setAddedImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index].position.x += 0.05 * translationX;
      newImages[index].position.y += 0.05 * translationY;
      return newImages;
    });
  };

  const handlePinchGestureEvent = (event, index) => {
    const { scale } = event.nativeEvent;
    setAddedImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index].scale = scale;
      return newImages;
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.memeBlock}>
        <ViewShot ref={viewRef} options={{ format: "png", quality: 0.8 }} style={styles.canvasContainer}>
          {currentMemeUrl && (
            <Image
              source={{ uri: currentMemeUrl }}
              style={[styles.memeImage, { zIndex: 0 }]}
              resizeMode="contain"
            />
          )}
          {addedImages.map((image, index) => (
            <PanGestureHandler
              key={index}
              onGestureEvent={(event) => handlePanGestureEvent(event, index)}
            >
              <PinchGestureHandler
                onGestureEvent={(event) => handlePinchGestureEvent(event, index)}
              >
                <View style={{
                  position: 'absolute',
                  top: image.position.y,
                  left: image.position.x,
                  transform: [
                    { scale: image.scale },
                    { rotate: `${image.rotation}rad` },
                  ],
                  zIndex: 1
                }}>
                  <Image source={{ uri: image.uri }} style={styles.addedImage} />
                </View>
              </PinchGestureHandler>
            </PanGestureHandler>
          ))}
          <Text style={styles.title}>{memeName}</Text>
        </ViewShot>
      </View>     
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
          <Icon name="image" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={_rotate90}>
          <Icon name="refresh" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={saveMeme}>
          <Icon name="save" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default StaticMemeCreationPage;

