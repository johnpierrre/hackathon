import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert } from 'react-native';
import styles from './styles';

const ImageEditingPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState('');

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        const { data } = await response.json();
        setMemes(data.memes);
        console.log("[INFO]: fetch memes successfully");
      } catch (err) {
        console.log("[ERROR]: fetchMemes failed:", err);
      }
    };
    fetchMemes();
  }, []);

  const handleSelection = () => {
    selectedMeme ? setSelectedMeme(null) : setSelectedMeme(item);
  }
   
  const handleCreateMeme = async () => {
    if (!selectedMeme)
      return;

    navigation.navigate(
      'Meme Editor', {
        memeName: name,
        memeUrl:  selectedMeme.url,
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memifier: Create a Meme</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Meme name"
        value={name}
        onChangeText={setName}
      />
      <Button color="#888" title="Create Meme" onPress={handleCreateMeme()} />

      <FlatList
        data={memes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.memeContainer, selectedMeme === item ? styles.selectedMemeContainer : null]}>
            <Image source={{ uri: item.url }} style={styles.memeImage} resizeMode="cover" />
            <Button
              color="#888"
              title="Select"
              onPress={handleSelection}
            />
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
