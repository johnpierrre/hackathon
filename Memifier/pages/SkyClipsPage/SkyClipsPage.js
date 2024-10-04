import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';

const SkyClipsVideos = ({navigation}) => {
  
  // List of video paths (adjust these paths to match your actual videos)
  const videoPaths = [
    require('../../Vídeos/2035509-hd_1920_1080_24fps.mp4'),
    require('../../Vídeos/2631160-hd_1920_1080_30fps.mp4'),
    require('../../Vídeos/2795749-uhd_3840_2160_25fps.mp4'),
  ];

  const navigateToCropPage = (videoUri) => {
    console.log(videoUri)
    if (!videoUri) {
      Alert.alert('Please select a video first.');
      return;
    }
    
    navigation.navigate('Crop Page', { videoUri});
  };

  return (
    <View>
      <Text>Local Videos</Text>
      <FlatList
        data={videoPaths}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToCropPage(item)}>
            <Video
              source={item}
              useNativeControls
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SkyClipsVideos;
