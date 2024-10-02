import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [text, setText] = React.useState('');

  const handleCreateMeme = () => {
    // Handle meme creation logic (e.g., send to backend)
    console.log('Meme created with text:', text);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});
