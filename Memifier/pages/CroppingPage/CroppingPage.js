import React, { useState } from 'react';
import { Text, Button, SafeAreaView, View } from 'react-native';
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native'; 
import { styles } from './styles';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { TextInput } from 'react-native-gesture-handler';

const CroppingPage = () => {
  const route = useRoute();
  const { videoUri } = route.params; 
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUri, setResizedUri] = useState('');

  const resizeVideo = async (width, height) => {
    setIsProcessing(true);
    const outputUri = `${videoUri.split('.').slice(0, -1).join('.')}_resized.gif`; // Create new output path
    const session = FFmpegKit.execute(`-i ${videoUri} -vf "scale=${width}:${height}" ${outputUri}`);
    
    session.then(async (session) => {
      const returnCode = await session.getReturnCode();
      setIsProcessing(false);

      if (ReturnCode.isSuccess(returnCode)) {
        // Video resized successfully, now play the resized video
        setResizedUri(outputUri); // Set the new URI to play the resized video
      } else {
        console.log('Failed to resize the video.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!resizedUri && <>
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
          onPress={() => resizeVideo(480, 480)} 
          disabled={isProcessing} 
        />
        <Button 
          title="YouTube" 
          onPress={() => resizeVideo(1920, 1080)} 
          disabled={isProcessing} 
        />
      </View></>}
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
