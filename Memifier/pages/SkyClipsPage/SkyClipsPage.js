import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Video } from 'expo-av';

const SkyClipsVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apikey='AIzaSyAPrIN7Vrhrue-0JEJf6VqCh6uZ0PCzOY0';
        const folderid='1z2CnpC2vDIvLZ-cC5imNjdcdA5q2s9PW';
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderid}'+in+parents&key=${apikey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.files) {
          const videoFiles = data.files.filter(file => file.mimeType === 'video/mp4');
          setVideos(videoFiles);
        } else {
          console.error('No files found in the response');
          setError('No files found');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to fetch videos');
      }
    };

    fetchVideos();
  }, []);

  return (
    <View>
      <Text>Google Drive Videos</Text>
      {error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Video
              source={{ uri: `https://drive.google.com/uc?export=download&id=${item.id}` }}
              useNativeControls
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
          )}
        />
      )}
    </View>
  );
};

export default SkyClipsVideos;
