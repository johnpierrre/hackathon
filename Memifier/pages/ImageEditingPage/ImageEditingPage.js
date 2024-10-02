import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import styles from './ImageEditingPage.css'; 

const ImageEditingPage = () => {
  const [text, setText] = useState('');
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState('');

  useEffect(() => {
    // fetchMemes();
  }, []);

  const handleCreateMeme = async () => {
    console.log(text);
    alert('Meme creation logic undefined');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memifier: Create a Meme</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter meme text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Create Meme" onPress={handleCreateMeme} />

      <FlatList
        data={memes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memeContainer}>
            <Image source={{ uri: item.url }} style={styles.memeImage} resizeMode="cover" />
            <Button title="Select" onPress={() => setSelectedMeme(item)} />
          </View>
        )}
      />

      {generatedMemeUrl ? (
        <Image source={{ uri: generatedMemeUrl }} style={styles.generatedMeme} resizeMode="cover"/>
      ) : null}
    </View>
  );
};

export default ImageEditingPage;
