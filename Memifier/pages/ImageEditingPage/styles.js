import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#ccc',
  },
  memeContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#888',
    padding: 10,
    borderRadius: 15,
  },
  selectedMemeContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#f88',
    padding: 10,
    borderRadius: 15,
  },
  memeImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
  generatedMeme: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});