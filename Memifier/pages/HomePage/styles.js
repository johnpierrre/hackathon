import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#444",
  },
  buttonsWrapper: {
    position: 'relative',
    align: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'col',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles; 
