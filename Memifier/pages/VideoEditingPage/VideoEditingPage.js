import React, { useState } from "react";
import { View, Text, Button, Alert, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";

const VideoEditingPage = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [video, setVideo] = useState(false);

  const pickVideo = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log(status);
    if (status === null || status.granted !== true) {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need media library permissions to make this work!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const { uri, duration } = result.assets[0];

      if (duration > 10000) {
        Alert.alert(
          "Error",
          "Please select a video that is 10 seconds or shorter.",
        );
        return;
      }
      console.log("Picked video URI:", uri);
      setVideoUri(uri);
      setVideo(true);
    } else {
      console.log("Video picking canceled or failed.");
    }
  };
  const GOTOCroppingPage = async () => {
    if (!videoUri) {
      Alert.alert("Please select a video first.");
      return;
    }

    navigation.navigate("Video Cropping", { videoUri });
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

        <Button
          title="Crop Video"
          onPress={GOTOCroppingPage}
          disabled={isProcessing}
        />
        {isProcessing && <Text>Processing video...</Text>}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Editor</Text>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Pick a Video" onPress={pickVideo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#888" title="Choose from sky's library" />
      </View>
      {isProcessing && <Text>Processing video...</Text>}
    </View>
  );
};

export default VideoEditingPage;
