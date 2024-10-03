import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker'; 
import { styles } from './styles';  
import { FFmpegKit } from 'react-native-ffmpeg';

const VideoEditingPage = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pickVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        mediaType: DocumentPicker.types.video,
      });
      setVideoUri(res.uri); 
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error: ', err);
        Alert.alert('Error', 'An error occurred while picking the video.');
      }
    }
  };

  const handleEditVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first.');
      return;
    }

    setIsProcessing(true);

    const outputUri = `${videoUri.substring(0, videoUri.lastIndexOf('.'))}-edited.mp4`;
    
    const command = `-i "${videoUri}" -vf "scale=320:240" "${outputUri}"`; 

    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      Alert.alert('Success', `Video processing completed! Saved to: ${outputUri}`);
    } else {
      Alert.alert('Error', 'Video processing failed. Please try again.');
      console.log('Error: ', returnCode);
    }

    setIsProcessing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Editor</Text>
      {videoUri && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }} 
            style={styles.video}
            controls
            resizeMode="contain"
          />
        </View>
      )}
      <Button title="Pick a Video" onPress={pickVideo} /> 
      <Button title="Edit Video" onPress={handleEditVideo} disabled={isProcessing} />
      {isProcessing && <Text>Processing video...</Text>}
    </View>
  );
};

export default VideoEditingPage;
