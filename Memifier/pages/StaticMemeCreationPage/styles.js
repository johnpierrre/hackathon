import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#222",
    color: "#222"
  },
  memeBlock: {
    width: 380,
    height: 580,
    borderWidth: 20,
    borderColor: '#888',
    backgroundColor: '#888',
    position: 'absolute',
    top: 10,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  canvasContainer: {
    width: '100%',
    height: '100%',
  },
  memeImage: {
    width: '100%',
    height: '100%',
  },
  addedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  title: {
    position: 'relative',
    bottom: 160,
    left: 10,
    zIndex: 1,
    fontSize: 40,
    textAlign: 'center',
    color: '#222',
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
    borderRadius: 10,
  },
});

export default styles; 
