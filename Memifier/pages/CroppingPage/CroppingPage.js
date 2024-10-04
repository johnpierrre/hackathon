import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Text, Button, Alert, SafeAreaView, View } from "react-native";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

const CroppingPage = () => {
  const route = useRoute();
  const { videoUri } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUri, setResizedUri] = useState("");

  const resizeVideo = async (width, height) => {
    try {
      process = new FFmpeg(videoUri);
      process.then(
        function (video) {
          console.log("The video can be processed");
        },
        function (err) {
          console.log("Error");
        },
      );
    } catch (e) {
      console.log(e);
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
