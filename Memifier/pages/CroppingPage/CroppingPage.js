import React, { useState } from 'react';
import { Text, Button, Alert, SafeAreaView, View } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native'; 
import { styles } from './styles';

const CroppingPage = () => {
  const route = useRoute();
  const { videoUri } = route.params; 
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUri, setResizedUri] = useState('');

  const resizeVideo = async (width, height) => {
    setIsProcessing(true);
    try {
      
    } catch (error) {
      console.error('Error during video resizing:', error);
      Alert.alert('Error', 'An error occurred during video processing. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        style={styles.video}
        source={{ uri: videoUri }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Instagram Reels" 
          onPress={() => resizeVideo(1080, 1920)} 
          disabled={isProcessing} 
        />
        <Button 
          title="YouTube" 
          onPress={() => resizeVideo(1280, 720)} 
          disabled={isProcessing} 
        />
      </View>
      {isProcessing && <Text>Processing video...</Text>}
      {resizedUri ? (
        <View style={{ marginTop: 20 }}>
          <Text>Resized Video:</Text>
          <Video
            style={styles.video}
            source={{ uri: resizedUri }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default CroppingPage;
