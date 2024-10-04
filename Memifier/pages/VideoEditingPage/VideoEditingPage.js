import React, { useState } from 'react';
import { View, Text, Button, Alert, SafeAreaView } from 'react-native';
import { Video } from 'expo-av'; 
import * as ImagePicker from 'expo-image-picker';
import { FFmpegKit } from 'react-native-ffmpeg';
import { styles } from './styles';

const VideoEditingPage = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [video, setVideo] = useState(false); 
  const [status, setStatus] = useState(null);

  const pickVideo = async () => {
    if (status !== 'granted')
      setStatus(await ImagePicker.requestMediaLibraryPermissionsAsync())

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need media library permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const uri = result.assets[0].uri;
      console.log('Picked video URI:', uri);
      setVideoUri(uri);
      setVideo(true);
    } else {
      console.log('Video picking canceled or failed.');
    }
  };

  const handleEditVideo = async () => {
    if (!videoUri) {
      Alert.alert('Please select a video first.');
      return;
    }

    setIsProcessing(true);

    const outputUri = `${videoUri.substring(0, videoUri.lastIndexOf('.'))}-edited.mp4`;
    const command = `-i "${videoUri}" -vf "scale=320:240" "${outputUri}"`;
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      Alert.alert(`Video processing completed! Saved to: ${outputUri}`);
    } else {
      Alert.alert('Video processing failed. Please try again.');
      console.log('Process terminated with return value ', returnCode);
    }

    setIsProcessing(false);
  };

  if (video) {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls 
          resizeMode="contain"
          isLooping
        />

        <Button title="Edit Video" onPress={handleEditVideo()} disabled={isProcessing()}/>
        {isProcessing && <Text>Processing video...</Text>}
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Editor</Text>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Pick a Video" onPress={pickVideo()}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Choose from sky's library"/>
      </View>
      {isProcessing && <Text>Processing video...</Text>}
   </View>
  );
};

export default VideoEditingPage;
