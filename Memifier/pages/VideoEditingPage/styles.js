import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#222",
    color: "#222",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff"
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  videoContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  video: {
    flex:1,
    alignSelf:"stretch"
  },
});
