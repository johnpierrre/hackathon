import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";

const backgroundImage = require("../../assets/background.jpg");

const VideoEditingPage = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [video, setVideo] = useState(false);

  const pickVideo = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

      console.log("Picked video URI:", uri);
      setVideoUri(uri);
      setVideo(true);
    } else {
      console.log("Video picking canceled or failed.");
    }
  };
  const GOTOCroppingPage = () => {
    if (!videoUri) {
      Alert.alert("Please select a video first.");
      return;
    }

    navigation.navigate("Crop Page", { videoUri });
  };
  const GOTODrivePage = () => {
    navigation.navigate("Drive Page");
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

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={GOTOCroppingPage}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>Crop</Text>
        </TouchableOpacity>
        {isProcessing && <Text>Processing video...</Text>}
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={pickVideo}>
        <Text style={styles.buttonText}> Pick a Video </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={GOTODrivePage}>
        <Text style={styles.buttonText}> Sky's library </Text>
      </TouchableOpacity>
      {isProcessing && <Text>Processing video...</Text>}
    </ImageBackground>
  );
};

export default VideoEditingPage;
